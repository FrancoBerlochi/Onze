export type ProductType = "Titular" | "Suplente" | "Tercera" | "Especial";
export type ProductCategory = "Nacional" | "Internacional";
export type Size = "S" | "M" | "L" | "XL" | "XXL" | "3XL";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  type: ProductType;
  image: string;
  featured?: boolean;
  stockS: number;
  stockM: number;
  stockL: number;
  stockXL: number;
  stockXXL: number;
  stock3XL: number;
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
    stockS: 10, stockM: 10, stockL: 10, stockXL: 10, stockXXL: 10, stock3XL: 10
  },
  {
    id: "2",
    name: "Marruecos Titular",
    price: 42000,
    category: "Internacional",
    type: "Titular",
    image: "/camiseta-seleccion-marruecos-roja.webp",
    featured: true,
    stockS: 10, stockM: 10, stockL: 10, stockXL: 10, stockXXL: 10, stock3XL: 10
  },
  {
    id: "3",
    name: "Juventus Retro Black",
    price: 48000,
    category: "Internacional",
    type: "Especial",
    image: "/camiseta-adidas-ferrari-negra.webp",
    featured: true,
    stockS: 10, stockM: 10, stockL: 10, stockXL: 10, stockXXL: 10, stock3XL: 10
  },
  {
    id: "4",
    name: "Boca Juniors Titular",
    price: 40000,
    category: "Nacional",
    type: "Titular",
    image: "/logo-onze-camisetas-remera.webp",
    stockS: 10, stockM: 10, stockL: 10, stockXL: 10, stockXXL: 10, stock3XL: 10
  },
  {
    id: "5",
    name: "River Plate Titular",
    price: 40000,
    category: "Nacional",
    type: "Titular",
    image: "/logo-onze-camisetas-remera.webp",
    stockS: 10, stockM: 10, stockL: 10, stockXL: 10, stockXXL: 10, stock3XL: 10
  },
  {
    id: "6",
    name: "Argentina Titular",
    price: 45000,
    category: "Nacional",
    type: "Titular",
    image: "/logo-onze-camisetas-remera.webp",
    featured: true,
    stockS: 10, stockM: 10, stockL: 10, stockXL: 10, stockXXL: 10, stock3XL: 10
  }
];
