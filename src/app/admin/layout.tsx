import Link from "next/link";
import { Store } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-brand-black text-white font-sans flex flex-col">
      {/* Barra de navegación simple para Admin */}
      <header className="bg-brand-card border-b border-white/5 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-gold rounded flex items-center justify-center font-anton text-brand-black text-xl leading-none pt-1">
            11
          </div>
          <span className="font-anton tracking-widest text-xl uppercase text-white/90">
            Panel <span className="text-brand-gold">Admin</span>
          </span>
        </div>
        <Link 
          href="/" 
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/70 hover:text-brand-gold transition-colors bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-lg border border-white/10"
        >
          <Store className="w-4 h-4" />
          <span className="hidden sm:inline">Volver a la Tienda</span>
        </Link>
      </header>

      {/* Contenido */}
      <main className="flex-1 flex flex-col relative w-full overflow-hidden">
        {children}
      </main>
    </div>
  );
}
