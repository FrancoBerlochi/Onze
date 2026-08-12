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
            <p className="text-sm text-white/70 max-w-sm leading-relaxed">
              Tienda 100% online especializada en camisetas de fútbol nacionales e internacionales. La mejor calidad para los verdaderos hinchas.
            </p>
            <div className="flex items-center gap-4 mt-3">
              <a 
                href="https://wa.me/5493413109231?text=Hola%2011%20ONZE%20CAMISETAS!%20Tengo%20una%20consulta" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 bg-brand-black/50 border border-white/10 rounded-full text-white/70 hover:text-brand-gold hover:bg-brand-black transition-all shadow-lg hover:shadow-brand-gold/20"
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/onze.camisetas/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 bg-brand-black/50 border border-white/10 rounded-full text-white/70 hover:text-brand-gold hover:bg-brand-black transition-all shadow-lg hover:shadow-brand-gold/20"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>

          {/* Links Col */}
          <div className="flex flex-col gap-4">
            <h3 className="font-anton text-xl tracking-wider text-white">ENLACES RÁPIDOS</h3>
            <nav className="flex flex-col gap-3">
              <Link href="#catalogo" className="text-sm text-white/60 hover:text-brand-gold transition-colors">Catálogo Completo</Link>
              <Link href="#medidas" className="text-sm text-white/60 hover:text-brand-gold transition-colors">Tabla de Medidas</Link>
              <Link href="#comprar" className="text-sm text-white/60 hover:text-brand-gold transition-colors">¿Cómo Comprar?</Link>
            </nav>
          </div>

          {/* Info Col */}
          <div className="flex flex-col gap-4">
            <h3 className="font-anton text-xl tracking-wider text-white">INFORMACIÓN</h3>
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
          <p className="text-xs text-white/60">
            &copy; {new Date().getFullYear()} 11 ONZE CAMISETAS. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs font-medium text-white/60 uppercase tracking-widest">Medios de Pago:</span>
            <span className="text-xs text-white/70">Efectivo • Transferencia • Crédito</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
