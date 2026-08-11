"use client";

import { Product } from "@/data/mockProducts";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import ProductModal from "./ProductModal";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [imgSrc, setImgSrc] = useState(product.image || "/logo-onze-camisetas-remera.webp");

  const totalStock = (product.stockS || 0) + (product.stockM || 0) + (product.stockL || 0) + (product.stockXL || 0) + (product.stockXXL || 0) + (product.stock3XL || 0);
  const isOutOfStock = totalStock === 0;

  return (
    <div className="flex flex-col h-full w-full">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`group flex flex-col h-full bg-brand-card/50 rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer ${
          isOutOfStock ? 'border-white/5 grayscale opacity-75' : 'border-white/5 hover:border-brand-gold/30'
        }`}
        onClick={() => setIsModalOpen(true)}
      >
        {/* Image Container */}
        <div className="relative aspect-[4/5] bg-[#111] overflow-hidden">
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
            <span className="px-3 py-1 bg-brand-black/80 backdrop-blur-md text-xs font-medium text-brand-gold rounded-full border border-brand-gold/20 uppercase tracking-widest self-start">
              {product.type}
            </span>
            {isOutOfStock && (
              <span className="px-3 py-1 bg-red-500/80 backdrop-blur-md text-xs font-bold text-white rounded-full border border-red-500/50 uppercase tracking-widest self-start shadow-lg">
                Sin Stock
              </span>
            )}
            {product.originalPrice && product.originalPrice > product.price && !isOutOfStock && (
              <span className="px-3 py-1 bg-red-600/90 backdrop-blur-md text-xs font-bold text-white rounded-full border border-red-500/50 uppercase tracking-widest self-start shadow-lg flex items-center gap-1">
                🔥 PROMO -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </span>
            )}
          </div>

          {/* Image */}
          <img
            src={imgSrc}
            alt={product.name}
            onError={() => {
              if (imgSrc !== "/logo-onze-camisetas-remera.webp") {
                setImgSrc("/logo-onze-camisetas-remera.webp");
              }
            }}
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />

          {/* Overlay Add to Cart button */}
          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
            <button 
              disabled={isOutOfStock}
              className={`w-full py-3 font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-colors ${
                isOutOfStock 
                  ? 'bg-white/10 text-white/50 cursor-not-allowed' 
                  : 'bg-brand-gold hover:bg-brand-gold-hover text-brand-black'
              }`}
            >
              {isOutOfStock ? 'Agotado' : (
                <>
                  <Plus className="w-5 h-5" />
                  Ver Detalles
                </>
              )}
            </button>
          </div>
          
          {/* Gradient Overlay for better contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Info Container */}
        <div className="p-5 flex flex-col flex-1 justify-between gap-4">
          <div>
            <div className={`text-xs uppercase tracking-widest mb-1 font-bold ${
              product.category === 'Nacional' ? 'text-sky-400' : 'text-emerald-400'
            }`}>
              {product.category}
            </div>
            <h3 className="font-sans font-medium text-lg text-white leading-tight line-clamp-2">
              {product.name}
            </h3>
          </div>
          
          <div className="flex items-end justify-between mt-auto">
            <div className="flex flex-col">
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-white/40 line-through mb-0.5">
                  ${product.originalPrice.toLocaleString("es-AR")}
                </span>
              )}
              <div className="font-anton text-2xl text-brand-gold tracking-wide">
                ${product.price.toLocaleString("es-AR")}
              </div>
            </div>
            <div className="flex gap-1 mb-1">
              {["S", "M", "L", "XL", "XXL", "3XL"].map(size => (
                <span key={size} className="text-[10px] text-white/30 font-medium">
                  {size}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
      <ProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} product={product} />
    </div>
  );
}
