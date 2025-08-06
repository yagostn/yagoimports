import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatCurrency, calculateInstallments } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ProductGridProps {
  products: Product[];
  showOutOfStock?: boolean;
}

export default function ProductGrid({
  products,
  showOutOfStock = true,
}: ProductGridProps) {
  if (!products.length) return null;

  const filteredProducts = showOutOfStock
    ? products
    : products.filter((product) =>
        product.variants.some((variant) =>
          variant.sizes.some((size) => size.stock > 0)
        )
      );

  if (!filteredProducts.length)
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">
          Nenhum produto disponível no momento.
        </p>
      </div>
    );

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {filteredProducts.map((product) => {
        const isInStock = product.variants.some((variant) =>
          variant.sizes.some((size) => size.stock > 0)
        );
        return (
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

                {product.featured && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-3 py-1">
                      NOVO
                    </Badge>
                  </div>
                )}

                {!isInStock && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Badge className="bg-red-600 hover:bg-red-700 text-white font-medium px-3 py-1.5 text-sm">
                      ESGOTADO
                    </Badge>
                  </div>
                )}
              </div>
              <CardContent className="p-3">
                <h3 className="font-medium line-clamp-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground uppercase">
                  {product.category}
                </p>
              </CardContent>
              <CardFooter className="p-3 pt-0 flex flex-col items-start">
                <div className="flex items-center gap-2">
                  <div className="font-bold">{formatCurrency(product.price)}</div>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <div className="text-sm text-muted-foreground line-through">
                      {formatCurrency(product.originalPrice)}
                    </div>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  {calculateInstallments(product.price)}
                </div>
              </CardFooter>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}