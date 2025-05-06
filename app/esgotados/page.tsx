import { products } from "@/lib/products";
import ProductGrid from "@/components/product-grid";

export default function OutOfStockPage() {
  const outOfStockProducts = products.filter((product) => product.stock === 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-2"> Produtos Esgotados</h1>
      <p className="text-center text-muted-foreground mb-8">
        Estes produtos estão temporariamente indisponíveis. Volte em breve para
        verificar a disponibilidade.
      </p>

      {outOfStockProducts.length > 0 ? (
        <ProductGrid products={outOfStockProducts} showOutOfStock={true} />
      ) : (
        <div className="text-center py-16">
          <p className="text-lg">Não há produtos esgotados no momento.</p>
        </div>
      )}
    </div>
  );
}
