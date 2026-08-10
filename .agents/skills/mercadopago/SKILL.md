---
name: mercadopago
description: >-
  Provides a step-by-step guide and best practices for integrating Mercado Pago in a Node.js/Next.js stack using the v2 SDK. Includes how to create preferences, handle webhooks, and process payments securely.
---

# Integración de Mercado Pago (SDK v2)

Esta skill te enseña cómo integrar Mercado Pago en cualquier aplicación web de forma segura.

## 1. Instalación y Configuración Básica
Para el backend (Node.js/Express):
```bash
npm install mercadopago
```
En tu archivo de configuración (ej. `src/config/mercadopago.ts`):
```typescript
import { MercadoPagoConfig, Preference } from 'mercadopago';

// Instanciar el cliente con el Access Token
export const mpClient = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN || 'TEST-TOKEN'
});
export const mpPreference = new Preference(mpClient);
```

## 2. Crear una Preferencia de Pago (Checkout Pro)
Cuando el usuario quiere pagar, tu frontend debe llamar a un endpoint de tu backend (`POST /api/checkout`). Este endpoint crea una "Preferencia" y devuelve el `init_point` (URL de pago).

```typescript
export const createCheckout = async (req, res) => {
  try {
    const { items, payer } = req.body;
    
    // 1. Guardar orden en DB como PENDING (para reservar stock si aplica)
    
    // 2. Crear la preferencia en Mercado Pago
    const body = {
      items: items.map(item => ({
        id: item.id,
        title: item.title,
        quantity: item.quantity,
        unit_price: item.price,
        currency_id: 'ARS'
      })),
      payer: {
        name: payer.name,
        email: payer.email,
      },
      back_urls: {
        success: "https://tudominio.com/gracias",
        failure: "https://tudominio.com/error",
        pending: "https://tudominio.com/pendiente"
      },
      auto_return: "approved",
      external_reference: "ID-DE-TU-BASE-DE-DATOS",
      notification_url: "https://tu-ngrok-o-dominio.com/api/webhooks/mercadopago"
    };

    const preference = await mpPreference.create({ body });
    
    res.json({ url: preference.init_point });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al generar pago" });
  }
}
```

## 3. Webhooks (Confirmación Automática)
Mercado Pago llamará a tu `notification_url` cuando cambie el estado del pago. 
Es crítico que uses `Payment.get(id)` para validar la veracidad del pago (nunca confíes ciegamente en el payload sin validar).

```typescript
import { Payment } from 'mercadopago';

export const webhookMP = async (req, res) => {
  const { type, data } = req.body;
  
  if (type === 'payment') {
    try {
      const paymentClient = new Payment(mpClient);
      const payment = await paymentClient.get({ id: data.id });
      
      if (payment.status === 'approved') {
        const orderId = payment.external_reference;
        // 1. Marcar la orden como PAGADA/ACEPTADA en la Base de Datos
        // 2. Enviar email de confirmación
        // 3. Descontar stock definitivamente
      }
    } catch (error) {
      console.error("Error validando pago", error);
    }
  }
  
  // Siempre devolver 200 rápido a Mercado Pago
  res.status(200).send("OK");
}
```

## 4. Pruebas Locales (Ngrok)
Dado que Mercado Pago no puede enviar webhooks a `localhost`, debés usar `ngrok` u otro túnel durante el desarrollo.
1. Instalalo y ejecutá: `ngrok http 4000`
2. Copiá la URL HTTPS generada por ngrok (ej: `https://4a3b-200.ngrok-free.app`)
3. Poné esa URL como dominio base en tu `notification_url` dentro de la Preferencia.

## Resumen de Flujo Seguro
1. **Frontend:** Elige productos -> Llama al backend.
2. **Backend:** Guarda en BD como PENDING -> Llama a MP -> Devuelve URL.
3. **Frontend:** Redirige a MP -> El usuario paga.
4. **MP:** Redirige al frontend a la URL de éxito (`back_urls.success`).
5. **MP (En paralelo):** Manda un Webhook secreto a tu backend notificando el pago.
6. **Backend:** Recibe webhook -> Valida con SDK -> Cambia estado a Aprobado.
