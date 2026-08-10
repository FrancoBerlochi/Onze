"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Package, CheckCircle, XCircle, Clock } from "lucide-react";
import toast from "react-hot-toast";

interface OrderItem {
  id: string;
  productId: string;
  size: string;
  customization: string | null;
  quantity: number;
  price: number;
  product: {
    name: string;
    image: string;
  };
}

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  city: string;
  zipCode: string;
  status: string;
  total: number;
  createdAt: string;
  mpPaymentId: string | null;
  items: OrderItem[];
}

export default function OrdersDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'PREPARE' | 'COMPLETED' | 'ABANDONED'>('PREPARE');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin/login");
      return;
    }
    fetchOrders();
  }, [router]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}`}/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Error al cargar pedidos");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    if (!confirm(`¿Estás seguro de marcar este pedido como ${status}?`)) return;

    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}`}/orders/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status })
      });

      if (res.ok) {
        toast.success(`Pedido marcado como ${status}`);
        fetchOrders();
      } else {
        toast.error("Error al actualizar pedido");
      }
    } catch (error) {
      toast.error("Error de conexión");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <span className="flex items-center gap-1 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-3 py-1 rounded-full text-xs font-bold"><Clock className="w-3 h-3" /> PENDIENTE PAGO</span>;
      case 'ACCEPTED':
        return <span className="flex items-center gap-1 bg-green-500/10 text-green-500 border border-green-500/20 px-3 py-1 rounded-full text-xs font-bold"><CheckCircle className="w-3 h-3" /> ACEPTADO / A ENVIAR</span>;
      case 'COMPLETED':
        return <span className="flex items-center gap-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full text-xs font-bold"><Package className="w-3 h-3" /> FINALIZADO / ENTREGADO</span>;
      case 'CANCELLED':
        return <span className="flex items-center gap-1 bg-red-500/10 text-red-500 border border-red-500/20 px-3 py-1 rounded-full text-xs font-bold"><XCircle className="w-3 h-3" /> CANCELADO</span>;
      default:
        return <span className="text-white/50">{status}</span>;
    }
  };

  if (loading) {
    return <div className="flex-1 flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-brand-gold" /></div>;
  }

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'PREPARE') return order.status === 'ACCEPTED';
    if (activeTab === 'COMPLETED') return order.status === 'COMPLETED';
    if (activeTab === 'ABANDONED') return order.status === 'PENDING' || order.status === 'CANCELLED';
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/dashboard" className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="font-anton text-3xl tracking-wide uppercase">Ventas <span className="text-brand-gold">Mercado Pago</span></h1>
          <p className="text-white/50 text-sm">Gestioná los pedidos ingresados y su estado de envío.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 bg-black/40 p-2 rounded-2xl border border-white/5">
        <button
          onClick={() => setActiveTab('PREPARE')}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-colors ${
            activeTab === 'PREPARE' ? 'bg-brand-gold text-black' : 'text-white/60 hover:bg-white/5 hover:text-white'
          }`}
        >
          📦 Para Preparar
        </button>
        <button
          onClick={() => setActiveTab('COMPLETED')}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-colors ${
            activeTab === 'COMPLETED' ? 'bg-blue-500 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
          }`}
        >
          ✅ Finalizados
        </button>
        <button
          onClick={() => setActiveTab('ABANDONED')}
          className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-colors ${
            activeTab === 'ABANDONED' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'text-white/60 hover:bg-white/5 hover:text-white'
          }`}
        >
          👻 Abandonados
        </button>
      </div>

      <div className="space-y-6">
        {filteredOrders.length === 0 ? (
          <div className="bg-brand-card/50 border border-white/5 rounded-2xl p-12 text-center text-white/50">
            No hay pedidos en esta sección.
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div key={order.id} className="bg-brand-card/50 border border-white/5 rounded-2xl overflow-hidden shadow-xl">
              {/* Encabezado del Pedido */}
              <div className="bg-black/40 p-4 sm:px-6 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-white/40 font-mono mb-1">ID: {order.id}</div>
                  <div className="font-bold text-lg">{order.customerName}</div>
                  <div className="text-sm text-white/60">{new Date(order.createdAt).toLocaleString("es-AR")}</div>
                </div>
                <div className="flex flex-col sm:items-end gap-2">
                  {getStatusBadge(order.status)}
                  <div className="font-anton text-xl text-brand-gold">${order.total.toLocaleString("es-AR")}</div>
                </div>
              </div>

              <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Datos del Cliente */}
                <div className="lg:col-span-1 space-y-4">
                  <h3 className="font-bold text-sm uppercase tracking-wider text-white/40">Datos de Envío</h3>
                  <div className="bg-black/20 rounded-xl p-4 text-sm space-y-2 border border-white/5">
                    <p><span className="text-white/50">Email:</span> {order.customerEmail}</p>
                    <p><span className="text-white/50">Tel:</span> {order.customerPhone}</p>
                    <p><span className="text-white/50">Dirección:</span> {order.address}</p>
                    <p><span className="text-white/50">Ciudad:</span> {order.city} ({order.zipCode})</p>
                    {order.mpPaymentId && (
                      <p className="pt-2 mt-2 border-t border-white/5 text-xs text-[#009EE3]">
                        Pago MP: #{order.mpPaymentId}
                      </p>
                    )}
                  </div>

                  {/* Acciones del Administrador */}
                  <div className="flex flex-col gap-2 pt-2">
                    {order.status === 'ACCEPTED' && (
                      <button 
                        onClick={() => updateStatus(order.id, 'COMPLETED')}
                        className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 font-bold py-2.5 rounded-lg border border-blue-500/30 transition-colors text-xs uppercase tracking-wider"
                      >
                        Marcar como Entregado
                      </button>
                    )}
                    {order.status !== 'CANCELLED' && order.status !== 'COMPLETED' && (
                      <button 
                        onClick={() => updateStatus(order.id, 'CANCELLED')}
                        className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold py-2.5 rounded-lg border border-red-500/20 transition-colors text-xs uppercase tracking-wider"
                      >
                        Cancelar Pedido (Devuelve Stock)
                      </button>
                    )}
                  </div>
                </div>

                {/* Artículos */}
                <div className="lg:col-span-2">
                  <h3 className="font-bold text-sm uppercase tracking-wider text-white/40 mb-4">Artículos del Pedido</h3>
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex gap-4 bg-black/20 p-3 rounded-xl border border-white/5">
                        <img 
                          src={item.product?.image || "/logo-onze-camisetas-remera.webp"} 
                          alt={item.product?.name || "Producto"} 
                          className="w-16 h-20 object-cover rounded-lg bg-black/50" 
                        />
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="font-bold">{item.product?.name || "Producto Eliminado"}</div>
                            <div className="text-xs text-white/50 mt-1">
                              Talle: {item.size} | Cantidad: {item.quantity}
                            </div>
                            {item.customization && (
                              <div className="text-xs text-brand-gold mt-1">
                                Personalización: {item.customization}
                              </div>
                            )}
                          </div>
                          <div className="font-mono text-sm">
                            ${item.price.toLocaleString("es-AR")}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
