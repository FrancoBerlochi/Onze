"use client";

import { ShoppingCart, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-brand-black/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button 
          aria-label="Abrir menú"
          className="md:hidden p-2 text-white hover:text-brand-gold transition-colors"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="font-anton text-2xl tracking-wide uppercase text-white group-hover:text-brand-gold transition-colors">
            11 ONZE <span className="text-brand-light-gray font-sans text-sm tracking-widest block -mt-1">CAMISETAS</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            href="/" 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-sm font-medium text-white hover:text-brand-gold transition-colors"
          >
            Inicio
          </Link>
          <Link href="#catalogo" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Catálogo</Link>
          <Link href="#comprar" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Cómo Comprar</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button 
            aria-label="Ver carrito"
            className="relative p-2 text-white hover:text-brand-gold transition-colors group"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-brand-gold text-brand-black text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[90] md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-[100dvh] w-[85%] max-w-xs bg-brand-black z-[100] flex flex-col md:hidden border-r border-white/10 shadow-2xl overflow-y-auto custom-scrollbar"
            >
              <div className="p-5 border-b border-white/10 flex items-center justify-between bg-brand-black shrink-0">
                <div className="font-anton text-xl tracking-wide uppercase text-white">
                  11 ONZE <span className="text-brand-gold text-xs block font-sans tracking-widest">CAMISETAS</span>
                </div>
                <button 
                  aria-label="Cerrar menú"
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="p-2 bg-white/10 rounded-full text-white/70 hover:text-white hover:bg-white/20 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <nav className="flex flex-col p-6 gap-6 flex-1 bg-brand-black">
                <Link 
                  href="/" 
                  onClick={() => { 
                    setIsMobileMenuOpen(false); 
                    window.scrollTo({ top: 0, behavior: "smooth" }); 
                  }} 
                  className="text-lg font-medium text-white hover:text-brand-gold transition-colors pb-3 border-b border-white/5"
                >
                  Inicio
                </Link>
                <Link 
                  href="#catalogo" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="text-lg font-medium text-white/80 hover:text-white transition-colors pb-3 border-b border-white/5"
                >
                  Catálogo
                </Link>
                <Link 
                  href="#comprar" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="text-lg font-medium text-white/80 hover:text-white transition-colors pb-3 border-b border-white/5"
                >
                  Cómo Comprar
                </Link>
              </nav>

              <div className="p-6 border-t border-white/10 bg-brand-black flex flex-col gap-3 shrink-0">
                <a 
                  href="https://wa.me/5493413109231?text=Hola%2011%20ONZE%20CAMISETAS!%20Tengo%20una%20consulta" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs font-bold uppercase tracking-widest text-brand-gold hover:text-white transition-colors"
                >
                  WhatsApp: 341 310-9231
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
