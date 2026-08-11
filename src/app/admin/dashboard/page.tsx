"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/data/mockProducts";
import { Plus, Edit2, Trash2, LogOut, Loader2, Image as ImageIcon } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Link from "next/link";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [storeSettings, setStoreSettings] = useState({ shippingCost: 0, freeShippingThreshold: 0 });
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const router = useRouter();

  // Form State
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [category, setCategory] = useState("Nacional");
  const [type, setType] = useState("Titular");
  const [image, setImage] = useState("");
  const [featured, setFeatured] = useState(false);
  const [stockS, setStockS] = useState(0);
  const [stockM, setStockM] = useState(0);
  const [stockL, setStockL] = useState(0);
  const [stockXL, setStockXL] = useState(0);
  const [stockXXL, setStockXXL] = useState(0);
  const [stock3XL, setStock3XL] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin/login");
      return;
    }
    fetchProducts();
    fetchSettings();
  }, [router]);

  const fetchSettings = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/settings`);
      if (res.ok) {
        const data = await res.json();
        setStoreSettings({ shippingCost: data.shippingCost, freeShippingThreshold: data.freeShippingThreshold });
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  const saveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsLoading(true);
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/settings`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(storeSettings)
      });
      if (res.ok) {
        toast.success("Configuración guardada");
      } else {
        toast.error("Error al guardar configuración");
      }
    } catch (error) {
      toast.error("Error de conexión");
    } finally {
      setSettingsLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}`}/products`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.push("/admin/login");
  };

  const openCreateModal = () => {
    setEditingProduct(null);
    setName("");
    setPrice("");
    setOriginalPrice("");
    setCategory("Nacional");
    setType("Titular");
    setImage("");
    setFeatured(false);
    setStockS(0);
    setStockM(0);
    setStockL(0);
    setStockXL(0);
    setStockXXL(0);
    setStock3XL(0);
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setPrice(product.price.toString());
    setOriginalPrice(product.originalPrice ? product.originalPrice.toString() : "");
    setCategory(product.category);
    setType(product.type);
    setImage(product.image);
    setFeatured(product.featured || false);
    setStockS(product.stockS || 0);
    setStockM(product.stockM || 0);
    setStockL(product.stockL || 0);
    setStockXL(product.stockXL || 0);
    setStockXXL(product.stockXXL || 0);
    setStock3XL(product.stock3XL || 0);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de que querés eliminar esta camiseta?")) return;

    const token = localStorage.getItem("admin_token");
    setDeletingId(id);
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}`}/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setProducts(products.filter((p) => p.id !== id));
        toast.success("Camiseta eliminada");
      } else {
        toast.error("Error al eliminar");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error de conexión");
    } finally {
      setDeletingId(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("admin_token");
    if (!token) return;

    setIsSubmitting(true);
    
    const productData = {
      name,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : null,
      category,
      type,
      image,
      featured,
      stockS: Number(stockS),
      stockM: Number(stockM),
      stockL: Number(stockL),
      stockXL: Number(stockXL),
      stockXXL: Number(stockXXL),
      stock3XL: Number(stock3XL),
    };

    try {
      const url = editingProduct 
        ? `${process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}`}/products/${editingProduct.id}` 
        : `${process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}`}/products`;
      
      const method = editingProduct ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchProducts(); // Recargar lista
        toast.success(editingProduct ? "Camiseta editada con éxito" : "Camiseta creada con éxito");
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Error al guardar");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error de conexión");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="flex-1 flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-brand-gold" /></div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-anton text-3xl tracking-wide uppercase">Gestión de Catálogo</h1>
          <p className="text-white/50 text-sm">Agregá, editá o eliminá productos de tu tienda.</p>
        </div>
        <div className="flex gap-4">
          <Link 
            href="/admin/mercadopago"
            className="flex items-center gap-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 px-5 py-2.5 rounded-lg font-bold uppercase tracking-wider text-sm hover:bg-blue-500/30 transition-colors"
          >
            Ventas MP
          </Link>
          <button 
            onClick={openCreateModal}
            className="flex items-center gap-2 bg-brand-gold text-brand-black px-5 py-2.5 rounded-lg font-bold uppercase tracking-wider text-sm hover:bg-[#ffb700] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nueva Camiseta
          </button>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white/5 border border-white/10 text-white/80 px-4 py-2.5 rounded-lg font-medium text-sm hover:bg-white/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Settings Section */}
      <div className="bg-brand-card/50 border border-white/5 rounded-2xl p-6 mb-8 shadow-xl">
        <h2 className="font-anton text-xl tracking-wide uppercase mb-4 text-brand-gold">Configuración de Envío</h2>
        <form onSubmit={saveSettings} className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-white/50 mb-2">Costo de Envío Base ($ ARS)</label>
            <input 
              type="number" 
              min="0"
              value={storeSettings.shippingCost}
              onChange={(e) => setStoreSettings({...storeSettings, shippingCost: Number(e.target.value)})}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-brand-gold focus:outline-none" 
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-white/50 mb-2">Envío Gratis a partir de (Cant. Camisetas)</label>
            <input 
              type="number" 
              min="0"
              value={storeSettings.freeShippingThreshold}
              onChange={(e) => setStoreSettings({...storeSettings, freeShippingThreshold: Number(e.target.value)})}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-brand-gold focus:outline-none" 
            />
            <p className="text-[10px] text-white/40 mt-1">Poné 0 si no querés aplicar envío gratis por cantidad.</p>
          </div>
          <button 
            type="submit"
            disabled={settingsLoading}
            className="bg-brand-gold text-brand-black px-6 py-2.5 rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-[#ffb700] transition-colors disabled:opacity-50 h-[46px]"
          >
            {settingsLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Guardar Envío"}
          </button>
        </form>
      </div>

      <div className="bg-brand-card/50 border border-white/5 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-black/40 text-white/60 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Camiseta</th>
                <th className="px-6 py-4 font-medium">Categoría</th>
                <th className="px-6 py-4 font-medium">Precio</th>
                <th className="px-6 py-4 font-medium">Destacada</th>
                <th className="px-6 py-4 font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img 
                        src={product.image || "/logo-onze-camisetas-remera.webp"} 
                        alt={product.name} 
                        onError={(e) => { (e.target as HTMLImageElement).src = "/logo-onze-camisetas-remera.webp"; }}
                        className="w-12 h-12 object-cover rounded-lg bg-black/50" 
                      />
                      <div>
                        <div className="font-bold text-white">{product.name}</div>
                        <div className="text-white/40 text-xs">{product.type}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs border font-medium ${
                      product.category === 'Nacional' 
                        ? 'bg-sky-500/10 text-sky-400 border-sky-500/20' 
                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    }`}>
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-brand-gold">
                    ${product.price.toLocaleString("es-AR")}
                    {product.originalPrice && product.originalPrice > product.price && (
                      <div className="text-xs text-red-400 line-through mt-1">${product.originalPrice.toLocaleString("es-AR")}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {product.featured ? (
                      <span className="text-green-400 text-xs font-bold uppercase tracking-wider bg-green-400/10 px-2 py-1 rounded">Sí</span>
                    ) : (
                      <span className="text-white/20 text-xs font-bold uppercase tracking-wider">No</span>
                    )}
                    <div className="mt-2 text-[10px] text-white/40 font-mono">
                      Stock: {(product.stockS || 0) + (product.stockM || 0) + (product.stockL || 0) + (product.stockXL || 0) + (product.stockXXL || 0) + (product.stock3XL || 0)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openEditModal(product)} disabled={deletingId !== null} className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-colors disabled:opacity-50" title="Editar">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(product.id)} disabled={deletingId === product.id} className="p-2 hover:bg-red-500/20 rounded-lg text-red-400 hover:text-red-300 transition-colors disabled:opacity-50" title="Eliminar">
                        {deletingId === product.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-white/40">
                    No hay productos en la base de datos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-brand-card w-full max-w-lg rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-black/20">
              <h2 className="font-anton text-2xl uppercase tracking-wide">
                {editingProduct ? "Editar Camiseta" : "Nueva Camiseta"}
              </h2>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar">
              <form id="productForm" onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/50 mb-2">Nombre del equipo</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-brand-gold focus:outline-none" placeholder="Ej: Real Madrid" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white/50 mb-2">Precio Final ($ ARS)</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required min="0" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-brand-gold focus:outline-none" placeholder="Ej: 40000" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-gold mb-2 flex items-center gap-1">Precio Original <span className="text-[10px] text-white/40">(Tachado)</span></label>
                    <input type="number" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} min="0" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-brand-gold focus:outline-none" placeholder="Ej: 50000 (Opcional)" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white/50 mb-2">Categoría</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-brand-gold focus:outline-none appearance-none">
                      <option value="Nacional">Nacional</option>
                      <option value="Internacional">Internacional</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white/50 mb-2">Tipo</label>
                    <select value={type} onChange={(e) => setType(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-brand-gold focus:outline-none appearance-none">
                      <option value="Titular">Titular</option>
                      <option value="Suplente">Suplente</option>
                      <option value="Tercera">Tercera</option>
                      <option value="Especial">Especial</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/50 mb-2">Imagen de la Camiseta</label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-brand-gold focus:outline-none text-sm" placeholder="URL de la imagen o /nombre.webp" />
                    
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setImage('/logo-onze-camisetas-remera.webp')}
                        className="bg-white/5 border border-white/10 px-4 rounded-xl text-xs font-bold text-white/60 hover:text-white hover:bg-white/10 transition-colors whitespace-nowrap flex items-center justify-center"
                        title="Usar imagen por defecto"
                      >
                        Logo por Defecto
                      </button>

                      {process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ? (
                        <CldUploadWidget 
                          uploadPreset="onze-camisetas" 
                          onSuccess={(result: any) => {
                            setImage(result.info.secure_url);
                          }}
                        >
                          {({ open }) => {
                            return (
                              <button 
                                type="button" 
                                onClick={(e) => { e.preventDefault(); open(); }}
                                className="bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors group"
                                title="Subir a Cloudinary"
                              >
                                <ImageIcon className="w-5 h-5 text-white/60 group-hover:text-brand-gold" />
                              </button>
                            );
                          }}
                        </CldUploadWidget>
                      ) : (
                        <button 
                          type="button" 
                          onClick={() => toast.error("Para usar este botón, debés configurar NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME en tu archivo .env.local de Next.js")}
                          className="bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl flex items-center justify-center cursor-help opacity-50"
                          title="Cloudinary no configurado"
                        >
                          <ImageIcon className="w-5 h-5 text-white/30" />
                        </button>
                      )}
                    </div>
                  </div>
                  {image && (
                    <div className="mt-3 relative w-32 h-32 rounded-xl border border-white/10 overflow-hidden bg-black/50">
                      <img 
                        src={image} 
                        alt="Preview" 
                        onError={(e) => { (e.target as HTMLImageElement).src = "/logo-onze-camisetas-remera.webp"; }}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  )}
                </div>

                {/* Stock Section */}
                <div className="pt-2 border-t border-white/5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-gold mb-3">Inventario por Talle (Stock)</label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {[
                      { label: "S", value: stockS, setter: setStockS },
                      { label: "M", value: stockM, setter: setStockM },
                      { label: "L", value: stockL, setter: setStockL },
                      { label: "XL", value: stockXL, setter: setStockXL },
                      { label: "XXL", value: stockXXL, setter: setStockXXL },
                      { label: "3XL", value: stock3XL, setter: setStock3XL },
                    ].map((size) => (
                      <div key={size.label}>
                        <label className="block text-[10px] font-bold text-center text-white/50 mb-1">{size.label}</label>
                        <input 
                          type="number" 
                          min="0"
                          value={size.value} 
                          onChange={(e) => size.setter(Number(e.target.value))} 
                          className="w-full bg-black/50 border border-white/10 rounded-lg px-2 py-1.5 text-white text-center focus:border-brand-gold focus:outline-none text-sm" 
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div className="relative">
                      <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="sr-only" />
                      <div className={`w-10 h-6 rounded-full transition-colors ${featured ? 'bg-brand-gold' : 'bg-white/10'}`}></div>
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${featured ? 'left-5' : 'left-1'}`}></div>
                    </div>
                    <span className="text-sm text-white/80 font-medium">Destacar en página principal</span>
                  </label>
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-white/5 bg-black/20 flex justify-end gap-3">
              <button type="button" onClick={() => setIsModalOpen(false)} disabled={isSubmitting} className="px-5 py-2.5 rounded-xl font-bold text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors disabled:opacity-50">
                Cancelar
              </button>
              <button type="submit" form="productForm" disabled={isSubmitting} className="bg-brand-gold text-brand-black px-6 py-2.5 rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-[#ffb700] transition-colors disabled:opacity-50 flex items-center gap-2">
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Guardar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
