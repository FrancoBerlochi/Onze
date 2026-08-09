export type ProductType = "Titular" | "Suplente" | "Tercera" | "Especial";
export type ProductCategory = "Nacional" | "Internacional";
export type Size = "S" | "M" | "L" | "XL" | "XXL" | "3XL";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: ProductCategory;
  type: ProductType;
  image: string;
  featured?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Italia - Edición Especial",
    price: 45000,
    category: "Internacional",
    type: "Especial",
    image: "/camiseta-seleccion-italia-azul.webp",
    featured: true,
  },
  {
    id: "2",
    name: "Marruecos Titular",
    price: 42000,
    category: "Internacional",
    type: "Titular",
    image: "/camiseta-seleccion-marruecos-roja.webp",
    featured: true,
  },
  {
    id: "3",
    name: "Juventus Retro Black",
    price: 48000,
    category: "Internacional",
    type: "Especial",
    image: "/camiseta-adidas-ferrari-negra.webp",
    featured: true,
  },
  {
    id: "4",
    name: "Boca Juniors Titular",
    price: 40000,
    category: "Nacional",
    type: "Titular",
    image: "/logo-onze-camisetas-remera.webp", // placeholder until real one is added
  },
  {
    id: "5",
    name: "River Plate Titular",
    price: 40000,
    category: "Nacional",
    type: "Titular",
    image: "/logo-onze-camisetas-remera.webp", // placeholder until real one is added
  },
  {
    id: "6",
    name: "Argentina Titular",
    price: 45000,
    category: "Nacional",
    type: "Titular",
    image: "/logo-onze-camisetas-remera.webp", // placeholder until real one is added
    featured: true,
  }
];
