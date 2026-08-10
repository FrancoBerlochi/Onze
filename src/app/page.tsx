import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import InfoBanners from "@/components/InfoBanners";
import ProductCard from "@/components/ProductCard";
import Catalog from "@/components/Catalog";
import { Product } from "@/data/mockProducts";

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'}/products`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();
  const featuredProducts = products.filter((p: Product) => p.featured);

  return (
    <>
      <Header />

      <main className="flex-1 flex flex-col w-full overflow-hidden">
        <Hero />

        {/* Featured Section */}
        <section className="py-20 bg-brand-black" id="destacadas">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="font-anton text-4xl md:text-5xl text-white tracking-wide uppercase">
                  Más <span className="text-brand-gold">Vendidas</span>
                </h2>
                <p className="text-white/50 mt-2 font-sans">
                  Las camisetas que todos quieren tener.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Catalog Section */}
        <section className="py-20 bg-brand-card/30" id="catalogo">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center mb-16">
              <h2 className="font-anton text-4xl md:text-5xl text-white tracking-wide uppercase">
                Catálogo <span className="text-brand-gold">Completo</span>
              </h2>
              <p className="text-white/50 mt-2 font-sans max-w-xl">
                Encontrá la camiseta de tu equipo favorito. Utilizá nuestros
                filtros para buscar rápidamente.
              </p>
            </div>

            <Catalog initialProducts={products} />
          </div>
        </section>

        <InfoBanners />
      </main>

      <Footer />
    </>
  );
}
