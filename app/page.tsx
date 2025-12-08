"use client";

import ProductGrid from "@/components/product-grid"
import FeaturedBanner from "@/components/featured-banner"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { db } from "@/lib/firebase/config"
import { collection, getDocs, query, where } from "firebase/firestore"
import { Product } from "@/lib/types"

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)

  useEffect(() => {
    loadProducts()
    loadCategories()
  }, [])

  const loadProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'produtos'))
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[]
      
      console.log('Produtos carregados:', productsData.length)
      
      // Filtrar apenas produtos com estoque
      const inStockProducts = productsData.filter(p => p.stock > 0)
      console.log('Produtos em estoque:', inStockProducts)
      setProducts(inStockProducts)
    } catch (error) {
      console.error('Erro ao carregar produtos:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadCategories = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'categorias'))
      const categoriesData = querySnapshot.docs.map(doc => doc.data().nome as string)
      setCategories(categoriesData)
    } catch (error) {
      console.error('Erro ao carregar categorias:', error)
    }
  }

  const inStockProducts = products
  const outOfStockCount = 0

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
              {categories.map((category) => (
                <Button
                  key={category}
                  variant="outline"
                  className="bg-card text-[#000000] whitespace-nowrap flex-shrink-0 snap-start"
                  onClick={() => handleCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Seta direita */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ChevronRight className="h-4 w-4 text-gray-600" />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto"
                 style={{ borderColor: 'oklch(0.208 0.042 265.755)', borderTopColor: 'transparent' }} />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg" style={{ color: 'oklch(0.5 0.05 265.755)' }}>
              Nenhum produto disponível no momento.
            </p>
          </div>
        ) : (
          <ProductGrid 
            products={inStockProducts.filter(product => {
              if (!categoryFilter) return true
              return product.category.toLowerCase() === categoryFilter.toLowerCase()
            })} 
            showOutOfStock={false} 
          />
        )}
      </div>
    </>
  )
}