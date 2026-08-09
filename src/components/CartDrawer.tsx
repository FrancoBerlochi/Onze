"use client";

import { useCart } from "@/context/CartContext";
import { X, Minus, Plus, Trash2, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  // WhatsApp logic
  const handleWhatsAppCheckout = () => {
    const phoneNumber = "5493413109231";
    let message = `¡Hola 11 ONZE CAMISETAS!\nQuisiera realizar el siguiente pedido:\n\n`;
    
    cartItems.forEach((item, index) => {
      message += `*${index + 1}. ${item.product.name}*\n`;
      message += `- Talle: ${item.size}\n`;
      if (item.customization) {
        message += `- Personalización: ${item.customization}\n`;
      }
      message += `- Cantidad: ${item.quantity}\n`;
      message += `- Precio unitario: $${item.product.price.toLocaleString("es-AR")}\n\n`;
    });

    message += `*Total estimado: $${cartTotal.toLocaleString("es-AR")}*`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

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
                  * El costo de envío se coordina por WhatsApp
                </p>
                <button 
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2.5 transition-colors mt-2 shadow-lg"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.105 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  Comprar por WhatsApp
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
