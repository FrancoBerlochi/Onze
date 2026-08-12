"use client";

import { ShoppingCart, Menu, X, Instagram } from "lucide-react";
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

              <div className="p-6 border-t border-white/10 bg-brand-black flex items-center justify-center gap-6 shrink-0">
                <a 
                  href="https://wa.me/5493413109231?text=Hola%2011%20ONZE%20CAMISETAS!%20Tengo%20una%20consulta" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-3 bg-white/5 border border-white/10 rounded-full text-white/70 hover:text-brand-gold hover:bg-brand-card transition-all"
                  aria-label="WhatsApp"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.instagram.com/onze.camisetas/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-3 bg-white/5 border border-white/10 rounded-full text-white/70 hover:text-brand-gold hover:bg-brand-card transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
