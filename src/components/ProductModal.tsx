"use client";

import { X, Ruler, Plus, Info, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Product, Size } from "@/data/mockProducts";
import { useCart } from "@/context/CartContext";
import SizeModal from "./SizeModal";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

const SIZES: Size[] = ["S", "M", "L", "XL", "XXL", "3XL"];

export default function ProductModal({ isOpen, onClose, product }: ProductModalProps) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [customization, setCustomization] = useState("");
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart({
      product,
      size: selectedSize,
      customization: customization.trim(),
      quantity: 1
    });
    // Reset and close
    setSelectedSize(null);
    setCustomization("");
    onClose();
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] flex items-center justify-center p-4 sm:p-6"
              onClick={onClose}
            />
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed z-[70] bottom-0 left-0 right-0 md:inset-0 md:m-auto w-full md:max-w-4xl bg-brand-card rounded-t-3xl md:rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row h-[90vh] md:h-fit md:max-h-[90vh]"
            >
              {/* Mobile Drag Handle */}
              <div className="md:hidden w-12 h-1 bg-white/20 rounded-full mx-auto mt-2.5 mb-1 shrink-0" />

              <button 
                onClick={onClose} 
                className="absolute top-4 right-4 z-10 p-2 bg-brand-black/50 backdrop-blur-md rounded-full text-white/80 hover:text-white hover:bg-brand-black transition-all"
              >
                <X className="w-5 h-5" />
              </button>
              
              {/* Image Section */}
              <div className="w-full md:w-1/2 h-[30vh] sm:h-[36vh] md:h-auto relative bg-[#111] shrink-0 border-b md:border-b-0 md:border-r border-white/5 group cursor-pointer" onClick={() => setIsZoomed(true)}>
                <img
                  src={product.image || "/logo-onze-camisetas-remera.webp"}
                  alt={product.name}
                  onError={(e) => { (e.target as HTMLImageElement).src = "/logo-onze-camisetas-remera.webp"; }}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Zoom overlay hint */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <div className="bg-brand-black/80 backdrop-blur text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium border border-white/10">
                    <ZoomIn className="w-4 h-4" /> Ampliar
                  </div>
                </div>

                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex flex-col gap-2">
                  <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-brand-black/80 backdrop-blur-md text-[10px] sm:text-xs font-medium text-brand-gold rounded-full border border-brand-gold/20 uppercase tracking-widest self-start">
                    {product.type}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-red-600/90 backdrop-blur-md text-[10px] sm:text-xs font-bold text-white rounded-full border border-red-500/50 uppercase tracking-widest self-start shadow-lg flex items-center gap-1">
                      🔥 PROMO -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  )}
                </div>
              </div>
              
              {/* Content Section */}
              <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 flex-1 flex flex-col justify-between overflow-y-auto custom-scrollbar">
                <div>
                  <div className="text-[10px] sm:text-xs text-white/50 uppercase tracking-widest mb-0.5">{product.category}</div>
                  <h2 className="font-sans font-bold text-lg sm:text-2xl md:text-3xl text-white leading-tight mb-1 sm:mb-2">
                    {product.name}
                  </h2>
                  <div className="flex items-end gap-3 mb-2 sm:mb-4">
                    <div className="font-anton text-2xl sm:text-3xl md:text-4xl text-brand-gold tracking-wide">
                      ${product.price.toLocaleString("es-AR")}
                    </div>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <div className="text-sm sm:text-lg text-white/40 line-through mb-1 sm:mb-1.5 font-bold">
                        ${product.originalPrice.toLocaleString("es-AR")}
                      </div>
                    )}
                  </div>
                  
                  {/* Size Selector */}
                  <div className="mb-3 sm:mb-6">
                    <div className="flex items-center justify-between mb-1.5 sm:mb-3">
                      <span className="text-xs sm:text-sm font-medium text-white/80 uppercase tracking-wider">Seleccionar Talle</span>
                      <button 
                        onClick={() => setIsSizeModalOpen(true)}
                        className="text-[11px] sm:text-xs flex items-center gap-1 text-brand-gold hover:text-brand-gold-hover transition-colors"
                      >
                        <Ruler className="w-3 h-3" />
                        Guía de talles
                      </button>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
                  {[
                    { size: "S" as Size, stock: product.stockS || 0 },
                    { size: "M" as Size, stock: product.stockM || 0 },
                    { size: "L" as Size, stock: product.stockL || 0 },
                    { size: "XL" as Size, stock: product.stockXL || 0 },
                    { size: "XXL" as Size, stock: product.stockXXL || 0 },
                    { size: "3XL" as Size, stock: product.stock3XL || 0 }
                  ].map(({ size, stock }) => (
                    <button
                      key={size}
                      onClick={() => stock > 0 && setSelectedSize(size)}
                      disabled={stock === 0}
                      className={`py-2 sm:py-3 rounded-xl font-medium transition-all ${
                        stock === 0 
                          ? "bg-white/5 text-white/20 cursor-not-allowed border border-white/5"
                          : selectedSize === size
                            ? "bg-brand-gold text-brand-black shadow-[0_0_15px_rgba(255,183,0,0.3)]"
                            : "bg-white/5 hover:bg-white/10 text-white/80 border border-white/10"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                  </div>

                  {/* Customization */}
                  <div className="mb-3 sm:mb-6 p-3 sm:p-4 bg-brand-black/50 rounded-xl border border-white/5">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="customization" className="text-xs sm:text-sm font-medium text-white/80 uppercase tracking-wider flex items-center justify-between">
                        Estampado Personalizado
                        <span className="text-[10px] sm:text-xs text-brand-gold normal-case font-normal flex items-center gap-1">
                          <Info className="w-3 h-3" /> Opcional
                        </span>
                      </label>
                      <input
                        id="customization"
                        type="text"
                        placeholder="Ej: MESSI 10"
                        value={customization}
                        onChange={(e) => setCustomization(e.target.value)}
                        className="w-full bg-brand-card border border-white/10 rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-gold transition-colors"
                      />
                      <p className="text-[10px] sm:text-xs text-white/40">Si deseás número y nombre, aclaralo arriba.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-auto pt-2 sm:pt-4 border-t border-white/10">
                  <button 
                    disabled={!selectedSize}
                    onClick={handleAddToCart}
                    className={`w-full py-3 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all ${
                      selectedSize 
                        ? 'bg-brand-gold hover:bg-brand-gold-hover text-brand-black' 
                        : 'bg-white/10 text-white/30 cursor-not-allowed'
                    }`}
                  >
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                    {selectedSize ? "Agregar al Carrito" : "Selecciona un talle"}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setIsZoomed(false)}
          >
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 sm:top-8 sm:right-8 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={product.image || "/logo-onze-camisetas-remera.webp"}
              alt={product.name}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onError={(e) => { (e.target as HTMLImageElement).src = "/logo-onze-camisetas-remera.webp"; }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      <SizeModal isOpen={isSizeModalOpen} onClose={() => setIsSizeModalOpen(false)} />
    </>
  );
}
