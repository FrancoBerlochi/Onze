"use client";

import { useCart } from "@/context/CartContext";
import { X, Minus, Plus, Trash2, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  const router = useRouter();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-brand-card z-50 flex flex-col border-l border-white/10 shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-brand-black">
              <h2 className="font-anton text-2xl tracking-wide uppercase text-white">Tu <span className="text-brand-gold">Carrito</span></h2>
              <button 
                onClick={() => setIsCartOpen(false)} 
                className="p-2 bg-white/5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 custom-scrollbar">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-white/50 space-y-4">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center">
                    <span className="font-anton text-4xl text-brand-gold/50">0</span>
                  </div>
                  <p className="font-sans text-center">Tu carrito está vacío.<br/>¡Es hora de elegir tu próxima camiseta!</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="px-6 py-3 border border-brand-gold text-brand-gold rounded-full font-bold uppercase tracking-widest text-sm hover:bg-brand-gold hover:text-brand-black transition-colors"
                  >
                    Ver Catálogo
                  </button>
                </div>
              ) : (
                cartItems.map(item => (
                  <div key={item.id} className="flex gap-4 bg-brand-black/50 p-3 rounded-xl border border-white/5">
                    <div className="relative w-20 h-24 bg-[#111] rounded-lg overflow-hidden shrink-0 border border-white/10">
                      <img src={item.product.image} alt={item.product.name} className="absolute inset-0 w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h4 className="font-sans font-medium text-sm text-white line-clamp-1">{item.product.name}</h4>
                        <div className="text-xs text-white/50 mt-1 flex flex-wrap gap-2">
                          <span className="bg-white/10 px-2 py-0.5 rounded">Talle {item.size}</span>
                          {item.customization && (
                            <span className="bg-brand-gold/20 text-brand-gold px-2 py-0.5 rounded">Estampe</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="font-anton text-lg text-brand-gold">${(item.product.price * item.quantity).toLocaleString("es-AR")}</div>
                        <div className="flex items-center gap-3 bg-white/5 rounded-full px-2 py-1">
                          <button onClick={() => updateQuantity(item.id, -1)} className="text-white/60 hover:text-white">
                            {item.quantity > 1 ? <Minus className="w-3 h-3" /> : <Trash2 className="w-3 h-3 text-red-400" onClick={() => removeFromCart(item.id)} />}
                          </button>
                          <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="text-white/60 hover:text-white">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 bg-brand-black border-t border-white/10 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/60 font-medium">Subtotal</span>
                  <span className="font-anton text-2xl text-white">${cartTotal.toLocaleString("es-AR")}</span>
                </div>
                <p className="text-xs text-brand-gold flex items-center gap-1">
                  * Envío gratis a todo el país
                </p>
                <button 
                  onClick={() => {
                    setIsCartOpen(false);
                    router.push("/carrito");
                  }}
                  className="w-full py-4 bg-brand-gold hover:bg-brand-gold-hover text-brand-black font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2.5 transition-colors mt-2 shadow-lg"
                >
                  Finalizar Compra
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
