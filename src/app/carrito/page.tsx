"use client";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeft, ShieldCheck, Truck, Lock } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const { cartItems, cartTotal } = useCart();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shippingSettings, setShippingSettings] = useState({ shippingCost: 0, freeShippingThreshold: 0 });

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: ""
  });

  useEffect(() => {
    setMounted(true);
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/settings`);
      if (res.ok) {
        const data = await res.json();
        setShippingSettings({ 
          shippingCost: data.shippingCost, 
          freeShippingThreshold: data.freeShippingThreshold 
        });
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const isShippingFree = shippingSettings.freeShippingThreshold > 0 && cartItemCount >= shippingSettings.freeShippingThreshold;
  const currentShippingCost = isShippingFree ? 0 : shippingSettings.shippingCost;
  const finalTotal = cartTotal + currentShippingCost;

  if (!mounted) return null;

  if (cartItems.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[70vh] px-4">
        <h1 className="font-anton text-4xl mb-4">TU CARRITO ESTÁ VACÍO</h1>
        <p className="text-white/50 mb-8">Agregá algunas camisetas antes de proceder al pago.</p>
        <Link 
          href="/"
          className="bg-brand-gold text-brand-black px-8 py-3 rounded-xl font-bold uppercase tracking-wider hover:bg-brand-gold-hover transition-colors"
        >
          Volver a la tienda
        </Link>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}`}/orders/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems.map(item => ({
            productId: item.product.id,
            name: item.product.name,
            size: item.size,
            customization: item.customization,
            quantity: item.quantity,
            price: item.product.price
          })),
          customer: formData,
          total: finalTotal,
          shippingCost: currentShippingCost
        })
      });

      const data = await response.json();
      
      if (response.ok && data.init_point) {
        // Redirigir a Mercado Pago
        window.location.href = data.init_point;
      } else {
        toast.error("Error al iniciar el pago: " + (data.error || "Desconocido"));
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error de conexión al procesar el pago.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl flex-1 flex flex-col">
      <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors self-start">
        <ArrowLeft className="w-4 h-4" /> Volver al catálogo
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Formulario de Envío */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div>
            <h1 className="font-anton text-3xl tracking-wide uppercase mb-2">Finalizar <span className="text-brand-gold">Compra</span></h1>
            <p className="text-white/50 text-sm">Completá tus datos para el envío y pago.</p>
          </div>

          <form id="checkoutForm" onSubmit={handleCheckout} className="space-y-6 bg-brand-card/50 p-6 sm:p-8 rounded-2xl border border-white/5">
            <h3 className="font-sans font-bold text-lg mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5 text-brand-gold" /> Datos de Envío
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/50 mb-2">Nombre y Apellido</label>
                <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-gold focus:outline-none" placeholder="Ej: Lionel Messi" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/50 mb-2">Email</label>
                <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-gold focus:outline-none" placeholder="ejemplo@email.com" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/50 mb-2">Teléfono / WhatsApp</label>
              <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-gold focus:outline-none" placeholder="Ej: +54 9 11 1234-5678" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-8">
                <label className="block text-xs font-bold uppercase tracking-wider text-white/50 mb-2">Dirección Completa</label>
                <input required type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-gold focus:outline-none" placeholder="Calle, Número, Piso, Depto" />
              </div>
              <div className="md:col-span-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-white/50 mb-2">Código Postal</label>
                <input required type="text" name="zipCode" value={formData.zipCode} onChange={handleInputChange} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-gold focus:outline-none" placeholder="Ej: 2000" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/50 mb-2">Ciudad y Provincia</label>
              <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-gold focus:outline-none" placeholder="Ej: Rosario, Santa Fe" />
            </div>
          </form>
        </div>

        {/* Resumen del Pedido */}
        <div className="lg:col-span-5">
          <div className="bg-brand-card/50 p-6 sm:p-8 rounded-2xl border border-white/5 sticky top-24">
            <h3 className="font-sans font-bold text-lg mb-6">Resumen del Pedido</h3>
            
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto custom-scrollbar pr-2">
              {cartItems.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-20 bg-[#111] rounded-lg overflow-hidden shrink-0 border border-white/10">
                    <img src={item.product.image || "/logo-onze-camisetas-remera.webp"} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-sans font-medium text-sm text-white line-clamp-2">{item.product.name}</h4>
                    <div className="text-xs text-white/50 mt-1">
                      Talle {item.size} • Cant: {item.quantity}
                    </div>
                    <div className="font-anton text-brand-gold mt-1">${(item.product.price * item.quantity).toLocaleString("es-AR")}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-4 space-y-3 mb-6">
              <div className="flex justify-between text-sm text-white/70">
                <span>Subtotal</span>
                <span>${cartTotal.toLocaleString("es-AR")}</span>
              </div>
              <div className="flex justify-between text-sm text-white/70">
                <span>Envío {shippingSettings.freeShippingThreshold > 0 && `(Gratis llevando ${shippingSettings.freeShippingThreshold})`}</span>
                {isShippingFree ? (
                  <span className="text-green-400 font-bold">Gratis</span>
                ) : (
                  <span>
                    {currentShippingCost > 0 ? `$${currentShippingCost.toLocaleString("es-AR")}` : <span className="text-green-400 font-bold">Gratis</span>}
                  </span>
                )}
              </div>
              <div className="flex justify-between items-end pt-3 border-t border-white/5">
                <span className="font-medium">Total</span>
                <span className="font-anton text-3xl text-white">${finalTotal.toLocaleString("es-AR")}</span>
              </div>
            </div>

            <button 
              type="submit"
              form="checkoutForm"
              disabled={isSubmitting}
              className="w-full py-4 bg-white hover:bg-gray-100 rounded-xl flex items-center justify-center transition-colors mb-4 disabled:opacity-50 border border-transparent shadow-sm"
            >
              {isSubmitting ? (
                <span className="text-[#009EE3] font-bold uppercase tracking-wider">Procesando...</span>
              ) : (
                <img 
                  src="https://http2.mlstatic.com/frontend-assets/ui-navigation/5.19.1/mercadopago/logo__large@2x.png" 
                  className="h-7 object-contain" 
                  alt="Mercado Pago" 
                />
              )}
            </button>
            
            <div className="flex items-center justify-center gap-2 text-xs text-white/40">
              <ShieldCheck className="w-4 h-4" /> Pago 100% seguro por Mercado Pago
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
