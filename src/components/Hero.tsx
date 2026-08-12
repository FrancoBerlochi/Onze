"use client";

import { ShoppingBag, Truck, ShieldCheck, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative w-full min-h-[calc(100vh-5rem)] flex flex-col justify-between bg-brand-black overflow-hidden border-b border-white/5 py-8 md:py-12">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/60 via-brand-black/85 to-brand-black z-10" />
        <Image 
          src="/diego.webp" 
          alt="11 ONZE Camisetas"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-50 scale-105"
        />
      </div>

      <div />

      {/* Main Content */}
      <div className="container relative z-10 mx-auto px-4 text-center my-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto flex flex-col items-center"
        >
          {/* Official Logo Emblem */}
          <div className="flex justify-center mb-6">
            <div className="w-42 h-42 sm:w-48 sm:h-48 rounded-full shadow-2xl overflow-hidden hover:scale-105 transition-transform duration-300">
              <img 
                src="/logo-onze-camisetas-remera.webp" 
                alt="11 ONZE CAMISETAS Logo" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          <h1 className="font-anton text-4xl sm:text-6xl md:text-7xl text-white tracking-wider uppercase mb-4 sm:mb-6 drop-shadow-lg">
            Vestí la pasión <br />
            <span className="text-brand-gold">de tu equipo</span>
          </h1>
          <p className="text-white/80 text-base sm:text-lg md:text-xl font-sans mb-8 max-w-2xl mx-auto leading-relaxed">
            Las mejores camisetas nacionales e internacionales. Calidad premium, envíos a todo el país y la mejor atención 100% online.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <a
              href="#catalogo"
              className="w-full sm:w-auto px-8 py-4 bg-brand-gold hover:bg-brand-gold-hover text-brand-black font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              Ver Catálogo
            </a>
            <a
              href="#destacadas"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold uppercase tracking-wider rounded-xl transition-all backdrop-blur-md"
            >
              Más Vendidas
            </a>
          </div>
        </motion.div>
      </div>

      {/* Benefits Cards Inside Hero */}
      <div className="container relative z-10 mx-auto px-4 mt-8 md:mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-white/10 hover:bg-white/15 transition-all">
            <div className="w-12 h-12 bg-brand-gold/10 text-brand-gold rounded-full flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h4 className="font-sans font-bold text-white text-base sm:text-lg">
                Envíos Rápidos
              </h4>
              <p className="text-white/60 text-xs sm:text-sm mt-0.5">
                A Rosario, VGG y todo el país
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-white/10 hover:bg-white/15 transition-all">
            <div className="w-12 h-12 bg-brand-gold/10 text-brand-gold rounded-full flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h4 className="font-sans font-bold text-white text-base sm:text-lg">
                Compra Segura
              </h4>
              <p className="text-white/60 text-xs sm:text-sm mt-0.5">
                Efectivo, Transferencia o Crédito
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-white/10 hover:bg-white/15 transition-all">
            <div className="w-12 h-12 bg-brand-gold/10 text-brand-gold rounded-full flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h4 className="font-sans font-bold text-white text-base sm:text-lg">
                100% Online
              </h4>
              <p className="text-white/60 text-xs sm:text-sm mt-0.5">
                Sin local físico, atención 24/7
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
