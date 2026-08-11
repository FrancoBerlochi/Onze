import Link from "next/link";
import { MapPin, Truck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-card border-t border-white/10 pt-16 pb-8 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand Col */}
          <div className="flex flex-col gap-4">
            <div className="font-anton text-3xl tracking-wide uppercase text-white">
              11 ONZE <span className="text-brand-gold">CAMISETAS</span>
            </div>
            <p className="text-sm text-white/60 max-w-sm leading-relaxed">
              Tienda 100% online especializada en camisetas de fútbol nacionales e internacionales. La mejor calidad para los verdaderos hinchas.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2">
              <a href="https://wa.me/5493413109231?text=Hola%2011%20ONZE%20CAMISETAS!%20Tengo%20una%20consulta" target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest text-brand-gold hover:text-white transition-colors">
                WhatsApp: 341 310-9231
              </a>
              <a href="https://www.instagram.com/onze.camisetas/" target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest text-brand-gold hover:text-white transition-colors">
                Seguinos en Instagram
              </a>
            </div>
          </div>

          {/* Links Col */}
          <div className="flex flex-col gap-4">
            <h4 className="font-anton text-xl tracking-wider text-white">ENLACES RÁPIDOS</h4>
            <nav className="flex flex-col gap-3">
              <Link href="#catalogo" className="text-sm text-white/60 hover:text-brand-gold transition-colors">Catálogo Completo</Link>
              <Link href="#medidas" className="text-sm text-white/60 hover:text-brand-gold transition-colors">Tabla de Medidas</Link>
              <Link href="#comprar" className="text-sm text-white/60 hover:text-brand-gold transition-colors">¿Cómo Comprar?</Link>
            </nav>
          </div>

          {/* Info Col */}
          <div className="flex flex-col gap-4">
            <h4 className="font-anton text-xl tracking-wider text-white">INFORMACIÓN</h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-white">Envíos a todo el país</p>
                  <p className="text-xs text-white/50 mt-1">Envíos en el día a Rosario y VGG</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-white">Tienda 100% Online</p>
                  <p className="text-xs text-white/50 mt-1">No contamos con local físico</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} 11 ONZE CAMISETAS. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs font-medium text-white/40 uppercase tracking-widest">Medios de Pago:</span>
            <span className="text-xs text-white/60">Efectivo • Transferencia • Crédito</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
