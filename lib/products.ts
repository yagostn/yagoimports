import type { Product } from "./types";

export const products: Product[] = [
  {
    id: "1",
    name: " Camisa Acostamento",
    description: "- Camisa Acostamento com Otíma qualidade e conforto",
    price: 49.99,
    images: ["/images/acostamentoazul.jpg","/images/acostamentobranca.jpg"],
    category: "Camisas",
    sizes: ["M", "G"],
    colors: ["#0f0264ff","#FFFFFF"],
    isNew:  true,
    stock: 1,
    variants: [
      {
        color: "#0f0264ff",
        image: "/images/acostamentoazul.jpg",
        sizes: [{ size: "G", stock: 1 }],
      },
      {
        color: "#FFFFFF",
        image: "/images/acostamentobranca.jpg",
        sizes: [{ size: "M", stock: 1 }],
      },
    ],
  },
  {
    id: "2",
    name: "Short Sarja Polo Ralph Lauren",
    description: "Shorts Sarja Polo Ralph Lauren com Otíma qualidade e conforto.",
    price: 69.99,
    images: ["/images/shortsajapolo1.jpg"],
    category: "Shorts Sarjas",
    sizes: ["M",],
    colors: ["#084808","#000080"],
    isNew:  true,
    stock: 1,
   variants: [
      {
        color: "#084808",
        image: "/images/shortsajapolo1.jpg",
        sizes: [{ size: "M", stock: 1 }],
      },
      {
        color: "#000080",
        image: "/images/shortsajapolo.jpg",
        sizes: [{ size: "M", stock: 1 }],
      },
    ],
  },
  {
    id: "3",
    name: "Short Sarja Tommy Hilfiger",
    description: "Shorts Sarja Tommy Hilfiger com Otíma qualidade e conforto.",
    price: 69.99,
    images: ["/images/shortsajatommy.jpg"],
    category: "Shorts Sarjas",
    sizes: ["M",],
    colors: ["#000000",],
    isNew:  true,
    stock: 1,
   variants: [
      {
        color: "#000000",
        image: "/images/shortsajatommy.jpg",
        sizes: [{ size: "M", stock: 1 }],
      },
    ],
      },
  {
    id: "4",
    name: "Short Sarja Boss",
    description: "Shorts Sarja Boss com Otíma qualidade e conforto.",
    price: 69.99,
    images: ["/images/shortsajaboss.jpg"],
    category: "Shorts Sarjas",
    sizes: ["M",],
    colors: ["#F5F5DC",],
    isNew:  true,
    stock: 1,
   variants: [
      {   
        color: "#F5F5DC",
        image: "/images/shortsajaboss.jpg",
        sizes: [{ size: "M", stock: 1 }],
      },
    ],
    
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
  },];  
  