"use client";

import { useCart } from "@/context/CartContext";
import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function GraciasPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    // Vaciar el carrito al llegar a esta página porque el pago fue exitoso (o al menos se intentó procesar en MP)
    clearCart();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6 text-green-500">
        <CheckCircle2 className="w-12 h-12" />
      </div>
      <h1 className="font-anton text-4xl mb-4 uppercase tracking-wide">¡Gracias por tu compra!</h1>
      <p className="text-white/70 max-w-md mx-auto mb-8 text-lg">
        Estamos preparando tu pedido con mucho cuidado. Pronto nos pondremos en contacto con vos a través del mail o teléfono que nos dejaste para coordinar los detalles del envío.
      </p>
      <Link 
        href="/"
        className="bg-brand-gold text-brand-black px-8 py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-brand-gold-hover transition-colors flex items-center gap-2"
      >
        Seguir Comprando <ArrowRight className="w-5 h-5" />
      </Link>
    </div>
  );
}
