import type { Product } from "./types";

export const products: Product[] = [
  {
    id: "1",
    name: "Básico rosa bebê",
    description: "Tecido Beach Gloss com FPS 50 || -P 36/38 M 38/40",
    price: 74.99,
    images: ["/images/rosa.jpeg"],
    category: "biquinis",
    sizes: ["P", "M"],
    colors: ["#F4C2C2"],
    isNew: true,
    stock: 2,
  },
  {
    id: "2",
    name: "Cortininha fio c/argola - off white",
    description:
      "O biquíni cortininha fio com argola - off white une charme e sofisticação, com top ajustável, bojo removível e detalhes metálicos, além de calcinha fio que valoriza as curvas.",
    price: 69.99,
    images: [
      "/images/branco.jpeg",
    ],
    category: "biquinis",
    sizes: ["P", "M"],
    colors: ["#FAF9F6"],
    isNew: true,
    stock: 2,
  },
  {
    id: "3",
    name: "Básico empina bumbum - azul bebê ",
    description:
      "Camiseta básica de algodão, confortável e versátil para o dia a dia.",
    price: 74.99,
    images: [
      "/images/azulbb.jpeg",
    ],
    category: "biquinis",
    sizes: ["M", "G"],
    colors: ["#89CFF0"],
    isNew: true,
    stock: 2,
  },
  {
    id: "4",
    name: "Camocim café com calcinha meio fio",
    description: "Maiô com recortes laterais, elegante e moderno para o verão.",
    price: 79.99,
    images: [
      "/images/cafe.png",
    ],
    category: "biquinis",
    sizes: ["P", "M",],
    colors: ["#392620"],
    isNew: true,
    stock: 2,
  },
  {
    id: "5",
    name: "Cortininha amarração amarelo",
    description:
      "Shorts jeans de cintura alta, confortável e estiloso para o verão.",
    price: 74.99,
    images: [
      "/images/amarelo.jpeg",
    ],
    category: "biquinis",
    sizes: ["P", "G"],
    colors: ["#ffff00"],
    isNew: true,
    stock: 2,
  },
  {
    id: "6",
    name: "Biquíni básico fio azul cristal",
    description:
      "Biquíni com estampa tropical, perfeito para dias de praia e piscina.",
    price: 74.99,
    images: [
      "/images/azul-cristal.jpeg",
      "/images/azul-cristal2.jpeg"
    ],
    category: "biquinis",
    sizes: ["M"],
    colors: ["#c8e5eb"],
    isNew: true,
    stock: 1,
  },
  {
    id: "7",
    name: "Vestido Longo",
    description: "Vestido longo e fluido, perfeito para ocasiões especiais.",
    price: 159.9,
    images: [
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
    ],
    category: "biquinis",
    sizes: ["P", "M", "G"],
    colors: ["#800080", "#C71585", "#000000"],
    isNew: true,
    stock: 0,
  },
  {
    id: "8",
    name: "Calça Jeans",
    description:
      "Calça jeans de cintura alta, confortável e versátil para o dia a dia.",
    price: 129.9,
    images: [
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
    ],
    category: "biquinis",
    sizes: ["36", "38", "40", "42", "44"],
    colors: ["#0D47A1", "#1976D2", "#2196F3"],
    isNew: true,
    stock: 0,
  },
];
