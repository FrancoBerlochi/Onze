"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const BANNERS = [
  {
    id: 1,
    title: "ENVIOS EN EL DÍA",
    subtitle: "A ROSARIO Y VGG",
    image: "/envios-onze-camisetas.webp",
  },
  {
    id: 2,
    title: "FORMAS DE PAGO",
    subtitle: "CRÉDITO • TRANSFERENCIA • EFECTIVO",
    image: "/formas-de-pago-onze-camisetas.webp",
  },
  {
    id: 3,
    title: "¿CÓMO COMPRAR?",
    subtitle: "100% ONLINE",
    image: "/como-comprar-onze-camisetas.webp",
  }
];

export default function InfoBanners() {
  return (
    <section className="bg-brand-black py-16 border-t border-white/5" id="comprar">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="font-anton text-4xl text-white tracking-wide uppercase">
            Comprar es <span className="text-brand-gold">Fácil</span>
          </h2>
          <p className="text-white/50 mt-2 font-sans">
            Todo lo que necesitas saber sobre tu compra.
          </p>
        </div>

        {/* Desktop: Grid of 3 */}
        <div className="hidden lg:grid grid-cols-3 gap-6">
          {BANNERS.map((banner) => (
            <div key={banner.id} className="relative aspect-[9/16] bg-brand-card rounded-2xl overflow-hidden border border-white/10 hover:border-brand-gold/30 transition-all duration-300">
              <img 
                src={banner.image} 
                alt={banner.title} 
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>

        {/* Mobile & Tablet: Swiper */}
        <div className="block lg:hidden w-full max-w-sm mx-auto">
          <Swiper
            modules={[Autoplay, Pagination]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            spaceBetween={20}
            slidesPerView={1}
            className="w-full aspect-[9/16] rounded-2xl overflow-hidden"
          >
            {BANNERS.map((banner) => (
              <SwiperSlide key={banner.id}>
                <div className="w-full h-full relative bg-brand-card border border-white/10">
                  <img 
                    src={banner.image} 
                    alt={banner.title} 
                    className="w-full h-full object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
