"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SizeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SizeModal({ isOpen, onClose }: SizeModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-brand-card border border-white/10 rounded-3xl overflow-hidden shadow-2xl max-w-lg w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={onClose} 
                className="absolute top-4 right-4 z-10 p-2 bg-brand-black/50 backdrop-blur-md rounded-full text-white/80 hover:text-white hover:bg-brand-black transition-all"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="p-6 border-b border-white/5 bg-brand-black text-center">
                <h3 className="font-anton text-2xl tracking-wide uppercase text-white">
                  Tabla de <span className="text-brand-gold">Medidas</span>
                </h3>
              </div>
              
              <div className="p-4 flex justify-center">
                <img 
                  src="/tabla-de-medidas-onze-camisetas.webp" 
                  alt="Tabla de medidas" 
                  className="w-full max-h-[60vh] object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

