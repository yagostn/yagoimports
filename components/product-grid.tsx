"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import type { Product } from "@/lib/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface ProductGridProps {
  products: Product[]
  showOutOfStock?: boolean
}

export default function ProductGrid({ products, showOutOfStock = true }: ProductGridProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  // Filtra produtos com base no parâmetro showOutOfStock
  const filteredProducts = showOutOfStock ? products : products.filter((product) => product.stock > 0)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredProducts.map((product) => (
        <Link href={`/produto/${product.id}`} key={product.id}>
          <Card
            className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg"
            onMouseEnter={() => setHoveredId(product.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={hoveredId === product.id && product.images.length > 1 ? product.images[1] : product.images[0]}
                alt={product.name}
                fill
                className={`object-cover transition-transform duration-500 hover:scale-105 ${product.stock === 0 ? "opacity-70" : ""}`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              <div className="absolute top-2 right-2 flex flex-col gap-2">
                {product.isNew && <Badge className="bg-primary text-primary-foreground">NOVO</Badge>}
                {product.stock === 0 && <Badge variant="destructive">ESGOTADO</Badge>}
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium text-lg line-clamp-1">{product.name}</h3>
              <p className="text-muted-foreground text-sm line-clamp-1">{product.category}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between items-center">
              <div className="font-bold">{formatCurrency(product.price)}</div>
              <div className="flex items-center gap-2">
                {product.stock > 0 && (
                  <span className="text-xs text-muted-foreground">
                    {product.stock} {product.stock === 1 ? "item" : "itens"}
                  </span>
                )}
                {product.colors.length > 0 && (
                  <div className="flex gap-1">
                    {product.colors.slice(0, 3).map((color) => (
                      <div
                        key={color}
                        className="w-3 h-3 rounded-full border border-gray-300"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                    {product.colors.length > 3 && (
                      <div className="text-xs text-muted-foreground">+{product.colors.length - 3}</div>
                    )}
                  </div>
                )}
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}

