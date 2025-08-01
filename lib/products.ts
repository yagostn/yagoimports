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
    description: "Tecido Beach Gloss com FPS 50\n- Acompanha bojo removível e saquinho\n- P 36/38 M 38/40 G 40/42\n- Alças e Calcinha reguláveis",
    price: 69.99,
    images: ["/images/shortsajapolo1.jpg"],
    category: "Shorts Sarjas",
    sizes: ["M",],
    colors: ["#084808","#081534"],
    isNew:  true,
    stock: 1,
   variants: [
      {
        color: "#084808",
        image: "/images/shortsajapolo1.jpg",
        sizes: [{ size: "M", stock: 1 }],
      },
      {
        color: "#081534",
        image: "/images/shortsajapolo.jpg",
        sizes: [{ size: "M", stock: 1 }],
      },
    ],
  },];  