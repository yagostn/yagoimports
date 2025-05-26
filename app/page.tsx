import ProductGrid from "@/components/product-grid"
import FeaturedBanner from "@/components/featured-banner"
import { products } from "@/lib/products"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function Home() {
  const inStockProducts = products.filter((product) => product.stock > 0)
  const outOfStockCount = products.length - inStockProducts.length

  return (
    <>
      <FeaturedBanner />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-4">Modelos disponíveis</h1>

        <div className="flex justify-center gap-4 mb-8">
          <Button
            variant="outline"
            className="bg-white text-[#7B3F00] hover:bg-gray-100"
            onClick={() => window.location.href = '/'}
          >
            Todos
          </Button>
          <Button
            variant="outline"
            className="bg-white text-[#7B3F00] hover:bg-gray-100"
            onClick={() => window.location.href = '/?category=biquinis'}
          >
            Biquinis
          </Button>
          <Button
            variant="outline"
            className="bg-white text-[#7B3F00] hover:bg-gray-100"
            onClick={() => window.location.href = '/?category=vestuario'}
          >
            Vestuário
          </Button>
        </div>

        <ProductGrid 
          products={inStockProducts.filter(product => {
            const searchParams = new URLSearchParams(window.location.search);
            const categoryFilter = searchParams.get('category');
            if (!categoryFilter) return true;
            return product.category.toLowerCase() === categoryFilter.toLowerCase();
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