"use client";

import ProductGrid from "@/components/product-grid"
import FeaturedBanner from "@/components/featured-banner"
import { products } from "@/lib/products"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Home() {
  const inStockProducts = products.filter((product) => product.stock > 0)
  const outOfStockCount = products.length - inStockProducts.length

  // Estado para armazenar o filtro de categoria
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)

  // Atualiza o filtro de categoria apenas no cliente
  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search)
      setCategoryFilter(searchParams.get("category"))
    }
  }, [])

  // Função para navegação sem erro SSR
  const handleCategory = (category?: string) => {
    if (typeof window !== "undefined") {
      if (!category) {
        window.location.href = "/"
      } else {
        window.location.href = `/?category=${category}`
      }
    }
  }

  return (
    <>
      <FeaturedBanner />

      <div className="container mx-auto px-2 py-8">
        <h1 className="text-2xl font-bold text-center mb-4">
          Sejam Bem-Vindos A Nossa Loja Com O Melhor Preço E Qualidade!
        </h1>

        <div className="mb-8 relative">
          <div className="relative group">
            {/* Seta esquerda */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ChevronLeft className="h-4 w-4 text-gray-600" />
            </div>
            
            {/* Container do carrossel */}
            <div className="flex overflow-x-auto scrollbar-hide gap-2 pb-2 px-8 snap-x snap-mandatory">
              <Button
                variant="outline"
                className="bg-card text-[#000000] whitespace-nowrap flex-shrink-0 snap-start"
                onClick={() => handleCategory()}
              >
                Todos
              </Button>
              <Button
                variant="outline"
                className="bg-card text-[#000000] whitespace-nowrap flex-shrink-0 snap-start"
                onClick={() => handleCategory("Camisas")}
              >
                Camisas
              </Button>
              <Button
                variant="outline"
                className="bg-card text-[#000000] whitespace-nowrap flex-shrink-0 snap-start"
                onClick={() => handleCategory("Shorts Sarjas")}
              >
                Shorts Sarjas
              </Button>
              <Button
                variant="outline"
                className="bg-card text-[#000000] whitespace-nowrap flex-shrink-0 snap-start"
                onClick={() => handleCategory("Perfumes")}
              >
                Perfumes
              </Button>
            </div>

            {/* Seta direita */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ChevronRight className="h-4 w-4 text-gray-600" />
            </div>
          </div>
        </div>

        <ProductGrid 
          products={inStockProducts.filter(product => {
            if (!categoryFilter) return true
            return product.category.toLowerCase() === categoryFilter.toLowerCase()
          })} 
          showOutOfStock={false} 
        />

        {outOfStockCount > 0 && (
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Temos {outOfStockCount} {outOfStockCount === 1 ? "produto esgotado" : "produtos esgotados"} no momento.
            </p>
            <Link href="/esgotados">
              <Button variant="ghost" className="bg-white text-black">
                Ver Produtos Esgotados
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}