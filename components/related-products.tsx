import Link from "next/link"
import Image from "next/image"
import type { Product } from "@/lib/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"

interface RelatedProductsProps {
  products: Product[]
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Produtos Relacionados</h2>
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
              </div>
              <CardContent className="p-3">
                <h3 className="font-medium line-clamp-1">{product.name}</h3>
              </CardContent>
              <CardFooter className="p-3 pt-0">
                <div className="font-bold">{formatCurrency(product.price)}</div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

