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
  stock: number; // Nova propriedade para controlar o estoque
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
