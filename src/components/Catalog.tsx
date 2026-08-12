"use client";

import { useState, useMemo } from "react";
import { Product } from "@/data/mockProducts";
import ProductCard from "./ProductCard";
import { Search, SlidersHorizontal } from "lucide-react";

type MainFilter = "Todas" | "Nacional" | "Internacional";
type SubFilter = "Todas" | "Titular" | "Suplente" | "Especial";
type SortOption = "precio-asc" | "precio-desc" | "nombre";

interface CatalogProps {
  initialProducts: Product[];
}

export default function Catalog({ initialProducts }: CatalogProps) {
  const [mainFilter, setMainFilter] = useState<MainFilter>("Todas");
  const [subFilter, setSubFilter] = useState<SubFilter>("Todas");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("precio-desc");
  const [isSortOpen, setIsSortOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    // Main Filter
    if (mainFilter !== "Todas") {
      result = result.filter(p => p.category === mainFilter);
    }

    // Sub Filter
    if (subFilter !== "Todas") {
      result = result.filter(p => p.type === subFilter || (subFilter === "Especial" && p.type === "Tercera"));
    }

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q));
    }

    // Sort
    result.sort((a, b) => {
      if (sortOption === "precio-asc") return a.price - b.price;
      if (sortOption === "precio-desc") return b.price - a.price;
      if (sortOption === "nombre") return a.name.localeCompare(b.name);
      return 0;
    });

    return result;
  }, [mainFilter, subFilter, searchQuery, sortOption]);

  return (
    <div className="flex flex-col gap-8 w-full">
      
      {/* Controls Bar */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-brand-black/50 p-4 rounded-2xl border border-white/5">
        
        {/* Main Tabs */}
        <div className="grid grid-cols-2 sm:flex bg-white/5 p-1.5 rounded-xl w-full lg:w-auto gap-1.5">
          {(["Todas", "Nacional", "Internacional"] as MainFilter[]).map(tab => (
            <button
              key={tab}
              onClick={() => setMainFilter(tab)}
              className={`flex-1 px-4 sm:px-6 py-3 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
                tab === "Internacional" ? "col-span-2 sm:col-span-1" : ""
              } ${
                mainFilter === tab 
                  ? 'bg-brand-gold text-brand-black shadow-lg' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab === "Todas" ? "Todas" : (tab === "Nacional" ? "Nacionales" : "Internacionales")}
            </button>
          ))}
        </div>

        {/* Search & Sort */}
        <div className="flex items-center gap-4 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input 
              type="text" 
              placeholder="Buscar equipo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-brand-card border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-gold transition-colors"
            />
          </div>
          
          <div className="relative shrink-0">
            <button 
              aria-label="Opciones de ordenamiento"
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2 bg-brand-card border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/80 hover:text-white hover:border-white/20 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4 text-brand-gold" />
              <span className="hidden sm:inline">Ordenar</span>
            </button>
            
            {/* Sort Dropdown (Click) */}
            {isSortOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsSortOpen(false)} />
                <div className="absolute right-0 top-full mt-2 w-48 bg-brand-card border border-white/10 rounded-xl shadow-2xl transition-all z-20 overflow-hidden">
                  <button 
                    onClick={() => { setSortOption("precio-desc"); setIsSortOpen(false); }}
                    className={`w-full text-left px-4 py-3 text-sm hover:bg-white/5 transition-colors ${sortOption === 'precio-desc' ? 'text-brand-gold font-medium' : 'text-white/80'}`}
                  >
                    Mayor Precio
                  </button>
                  <button 
                    onClick={() => { setSortOption("precio-asc"); setIsSortOpen(false); }}
                    className={`w-full text-left px-4 py-3 text-sm hover:bg-white/5 transition-colors border-t border-white/5 ${sortOption === 'precio-asc' ? 'text-brand-gold font-medium' : 'text-white/80'}`}
                  >
                    Menor Precio
                  </button>
                  <button 
                    onClick={() => { setSortOption("nombre"); setIsSortOpen(false); }}
                    className={`w-full text-left px-4 py-3 text-sm hover:bg-white/5 transition-colors border-t border-white/5 ${sortOption === 'nombre' ? 'text-brand-gold font-medium' : 'text-white/80'}`}
                  >
                    Nombre (A-Z)
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Sub Filters */}
      <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
        {(["Todas", "Titular", "Suplente", "Especial"] as SubFilter[]).map(filter => (
          <button
            key={filter}
            onClick={() => setSubFilter(filter)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-widest transition-colors border ${
              subFilter === filter 
                ? 'bg-brand-gold/20 border-brand-gold text-brand-gold' 
                : 'bg-transparent border-white/10 text-white/50 hover:border-white/30 hover:text-white'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Search className="w-12 h-12 text-white/20 mb-4" />
          <h3 className="font-sans font-medium text-xl text-white mb-2">No se encontraron camisetas</h3>
          <p className="text-white/50 text-sm">Intentá con otros filtros o términos de búsqueda.</p>
          <button 
            onClick={() => {
              setMainFilter("Todas");
              setSubFilter("Todas");
              setSearchQuery("");
            }}
            className="mt-6 px-6 py-2 border border-brand-gold text-brand-gold rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand-gold hover:text-brand-black transition-colors"
          >
            Limpiar Filtros
          </button>
        </div>
      )}
    </div>
  );
}
