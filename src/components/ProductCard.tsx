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

  return (
    <div className="flex flex-col h-full w-full">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="group flex flex-col h-full bg-brand-card/50 rounded-2xl overflow-hidden border border-white/5 hover:border-brand-gold/30 transition-all duration-300 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Image Container */}
        <div className="relative aspect-[4/5] bg-[#111] overflow-hidden">
          {/* Type Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 bg-brand-black/80 backdrop-blur-md text-xs font-medium text-brand-gold rounded-full border border-brand-gold/20 uppercase tracking-widest">
              {product.type}
            </span>
          </div>

          {/* Image */}
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />

          {/* Overlay Add to Cart button */}
          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
            <button className="w-full py-3 bg-brand-gold hover:bg-brand-gold-hover text-brand-black font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-colors">
              <Plus className="w-5 h-5" />
              Ver Detalles
            </button>
          </div>
          
          {/* Gradient Overlay for better contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Info Container */}
        <div className="p-5 flex flex-col flex-1 justify-between gap-4">
          <div>
            <div className="text-xs text-white/50 uppercase tracking-widest mb-1">{product.category}</div>
            <h3 className="font-sans font-medium text-lg text-white leading-tight line-clamp-2">
              {product.name}
            </h3>
          </div>
          
          <div className="flex items-end justify-between mt-auto">
            <div className="font-anton text-2xl text-brand-gold tracking-wide">
              ${product.price.toLocaleString("es-AR")}
            </div>
            <div className="flex gap-1">
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
