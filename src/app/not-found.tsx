import Link from 'next/link'
import { SearchX, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="w-24 h-24 bg-brand-card rounded-3xl border border-white/5 flex items-center justify-center mb-8 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-gold/20 to-transparent"></div>
        <SearchX className="w-10 h-10 text-brand-gold relative z-10" />
      </div>
      
      <h1 className="font-anton text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 uppercase tracking-widest mb-4">
        404
      </h1>
      
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
        Fuera de Juego
      </h2>
      
      <p className="text-white/50 max-w-md mx-auto mb-10">
        Parece que la camiseta o página que estás buscando no existe o fue movida a otra categoría.
      </p>
      
      <Link 
        href="/"
        className="flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-hover text-brand-black font-bold uppercase tracking-wider px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95"
      >
        <ArrowLeft className="w-5 h-5" />
        Volver al Catálogo
      </Link>
    </div>
  )
}
