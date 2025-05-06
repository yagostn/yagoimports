import Link from "next/link"
import Image from "next/image"
import type { Product } from "@/lib/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface RelatedProductsProps {
  products: Product[]
  title?: string
}

export default function RelatedProducts({ products, title = "Produtos Relacionados" }: RelatedProductsProps) {
  if (!products.length) return null

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link href={`/produto/${product.id}`} key={product.id}>
            <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />

                {/* Overlay para produtos fora de estoque */}
                {product.stock <= 0 && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Badge className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 text-sm">Esgotado</Badge>
                  </div>
                )}
              </div>
              <CardContent className="p-3">
                <h3 className="font-medium line-clamp-1"  >{product.name}</h3>
              </CardContent>
              <CardFooter className="p-3 pt-0">
                <div className="font-bold flex items-center justify-between w-full">
                  <span>{formatCurrency(product.price)}</span>    
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
