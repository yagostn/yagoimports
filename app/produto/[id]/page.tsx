import { notFound } from "next/navigation"
import { products } from "@/lib/products"
import ProductDetails from "@/components/product-details"
import RelatedProducts from "@/components/related-products"
import ImageZoom from "@/components/image-zoom"
import { GetServerSideProps, NextPage } from "next"

// Função para obter os parâmetros e passar como props
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params || {}

  // Verifica se o parâmetro id existe
  if (!id) {
    return { notFound: true }
  }

  return {
    props: {
      params: { id: id as string },
    },
  }
}

const ProductPage: NextPage<{ params: { id: string } }> = ({ params }) => {
  const product = products.find((p) => p.id === params.id)

  if (!product) {
    notFound()
  }

  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="relative aspect-square">
          <ImageZoom src={product.images[0] || "/placeholder.svg"} alt={product.name} className="rounded-lg" />
        </div>

        <ProductDetails product={product} />
      </div>

      {product.images.length > 1 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-4">Mais imagens</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {product.images.slice(1).map((image, index) => (
              <div key={index} className="relative aspect-square">
                <ImageZoom
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - Imagem ${index + 2}`}
                  className="rounded-lg"
                  zoomScale={2}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {relatedProducts.length > 0 && <RelatedProducts products={relatedProducts} />}
    </div>
  )
}

export default ProductPage
