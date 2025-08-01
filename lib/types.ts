export interface Variant {
  color: string; // O código hexadecimal da cor
  image: string; // A imagem para esta cor específica
  sizes: {
    size: string;
    stock: number;
  }[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  sizes: string[];
  colors: string[];
  isNew?: boolean;
  variants: Variant[]; // Substitui colors, sizes e stock
  stock: number;
  featured?: boolean// Nova propriedade para controlar o estoque
  colorImages?: { [color: string]: string }
  
}
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string | null;
  color: string | null;
}
