"use client";

import React, { useState, useEffect, use } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { products } from "@/lib/products";
import ProductDetails from "@/components/product-details";
import RelatedProducts from "@/components/related-products";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import ClientOnly from "@/components/client-only";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = use(params);
  const product = products.find((p) => p.id === resolvedParams.id);

  if (!product) {
    notFound();
  }

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product.variants.length > 0 ? product.variants[0].color : null
  );

  // Encontrar a variante selecionada
  const selectedVariant = product.variants.find((v) => v.color === selectedColor);
  
  // Criar lista de imagens disponíveis
  let currentImages = [...product.images];
  if (selectedVariant && selectedVariant.image && !currentImages.includes(selectedVariant.image)) {
    currentImages = [selectedVariant.image, ...product.images];
  }
  
  const selectedImage = currentImages[currentImageIndex] || "/placeholder.svg";

  // Reset do índice da imagem quando a cor mudar e ir para a imagem da variante
  useEffect(() => {
    if (selectedVariant && selectedVariant.image) {
      const variantImageIndex = currentImages.findIndex(img => img === selectedVariant.image);
      if (variantImageIndex !== -1 && variantImageIndex !== currentImageIndex) {
        setCurrentImageIndex(variantImageIndex);
      }
    }
  }, [selectedColor]);

  // Detectar qual variante está sendo mostrada no carrossel atual
  useEffect(() => {
    const currentImage = currentImages[currentImageIndex];
    if (currentImage) {
      const variantForCurrentImage = product.variants.find(v => v.image === currentImage);
      if (variantForCurrentImage && variantForCurrentImage.color !== selectedColor) {
        // Só atualiza se realmente mudou e evita loops
        setSelectedColor(variantForCurrentImage.color);
      }
    }
  }, [currentImageIndex]); // Removido as outras dependências que causavam loop

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === currentImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? currentImages.length - 1 : prev - 1
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="relative aspect-square group">
          <Image
            src={selectedImage}
            alt={product.name}
            fill
            className="rounded-lg object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          
          {currentImages.length > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={prevImage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={nextImage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {currentImages.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <ClientOnly>
          <ProductDetails 
            product={product} 
            selectedColor={selectedColor}
            onColorChange={setSelectedColor}
          />
        </ClientOnly>
      </div>

      {relatedProducts.length > 0 && (
        <RelatedProducts products={relatedProducts} />
      )}
    </div>
  );
}