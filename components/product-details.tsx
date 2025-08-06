"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { formatCurrency, calculateInstallments } from "@/lib/utils";
import { useCart } from "@/lib/use-cart";
import { ShoppingCart, Check, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProductDetailsProps {
  product: Product;
  selectedColor?: string | null;
  onColorChange?: (color: string | null) => void;
}

export default function ProductDetails({
  product,
  selectedColor: externalSelectedColor,
  onColorChange,
}: ProductDetailsProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  const [selectedColor, setSelectedColor] = useState<string | null>(
    externalSelectedColor ?? (product.variants.length > 0 ? product.variants[0].color : null)
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(() => {
    // Selecionar tamanho inicial automaticamente
    const initialVariant = product.variants.find(v => v.color === (externalSelectedColor ?? product.variants[0]?.color));
    if (initialVariant) {
      const availableSizes = initialVariant.sizes.filter(s => s.stock > 0);
      return availableSizes.length > 0 ? availableSizes[0].size : null;
    }
    return null;
  });
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  // Sincronizar cor selecionada com prop externa apenas uma vez
  useEffect(() => {
    if (externalSelectedColor !== undefined && externalSelectedColor !== selectedColor) {
      setSelectedColor(externalSelectedColor);
    }
  }, [externalSelectedColor]); // Removido selectedColor da dependência

  // Função para mudar cor
  const handleColorChange = (color: string) => {
    if (color !== selectedColor) {
      setSelectedColor(color);
      if (onColorChange) {
        onColorChange(color);
      }
    }
  };

  const selectedVariant = useMemo(
    () => product.variants.find((v) => v.color === selectedColor),
    [selectedColor, product.variants]
  );

  const availableSizes = useMemo(
    () => selectedVariant?.sizes.filter((s) => s.stock > 0) || [],
    [selectedVariant]
  );

  useEffect(() => {
    if (selectedVariant) {
      const availableSizes = selectedVariant.sizes.filter((s) => s.stock > 0);
      
      if (availableSizes.length > 0) {
        // Se há apenas um tamanho disponível, seleciona automaticamente
        if (availableSizes.length === 1) {
          if (selectedSize !== availableSizes[0].size) {
            setSelectedSize(availableSizes[0].size);
          }
        } 
        // Se o tamanho atual não está disponível na nova variante
        else if (selectedSize && !availableSizes.some(s => s.size === selectedSize)) {
          setSelectedSize(availableSizes[0].size);
        }
        // Se não há tamanho selecionado, seleciona o primeiro disponível
        else if (!selectedSize) {
          setSelectedSize(availableSizes[0].size);
        }
      } else {
        // Se não há tamanhos disponíveis, limpa a seleção
        if (selectedSize !== null) {
          setSelectedSize(null);
        }
      }
    }
  }, [selectedColor]); // Só executa quando a cor muda

  const totalStock = useMemo(
    () =>
      product.variants.reduce(
        (total, variant) =>
          total +
          variant.sizes.reduce((sum, size) => sum + size.stock, 0),
        0
      ),
    [product.variants]
  );

  const stockForSelectedSize =
    selectedVariant?.sizes.find((s) => s.size === selectedSize)?.stock ?? 0;

  const isOutOfStock = totalStock === 0;
  const isVariantOutOfStock = stockForSelectedSize === 0 && !!selectedSize;
  const maxQuantity = stockForSelectedSize;

  const handleAddToCart = () => {
    if (
      !selectedVariant ||
      !selectedSize ||
      isOutOfStock ||
      isVariantOutOfStock
    )
      return;

    const success = addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: selectedVariant.image,
      quantity,
      size: selectedSize,
      color: selectedColor,
    });

    if (success) {
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    } else {
      alert(`Estoque insuficiente! Disponível: ${stockForSelectedSize} unidades`);
    }
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    handleAddToCart();
    router.push("/carrinho");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-1.5xl font-bold">{product.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <p className="text-xl font-bold">
              {formatCurrency(product.price)}
            </p>
            {product.originalPrice && product.originalPrice > product.price && (
              <p className="text-sm text-muted-foreground line-through">
                {formatCurrency(product.originalPrice)}
              </p>
            )}
            {product.originalPrice && product.originalPrice > product.price && (
              <Badge variant="destructive" className="text-sm px-2 py-0.5">10% OFF</Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            {calculateInstallments(product.price)}
          </p>
        </div>
        {isOutOfStock ? (
          <Badge variant="destructive" className="text-sm px-3 py-1">
            ESGOTADO
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="text-sm px-3 py-1 bg-white text-black border-gray-300"
          >
            {totalStock} {totalStock === 1 ? "item" : "itens"} em estoque
          </Badge>
        )}
      </div>

      <div className="space-y-4">
        <p
          style={{
            fontFamily: "Arial, serif",
            lineHeight: 1.6,
            fontSize: "1rem",
            color: "#000000",
          }}
        >
          {product.description.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>

        {isOutOfStock && (
          <div className="flex items-center gap-2 text-destructive bg-destructive/10 p-3 rounded-md">
            <AlertTriangle className="h-5 w-5" />
            <p className="text-sm">
              Este produto está temporariamente esgotado.
            </p>
          </div>
        )}

        {product.variants.length > 0 && product.category !== "Perfumes" && (
          <div>
            <h3 className="font-medium mb-2">Cor</h3>
            <RadioGroup
              value={selectedColor ?? ""}
              onValueChange={handleColorChange}
              className="flex flex-wrap gap-3"
              disabled={isOutOfStock}
            >
              {product.variants.map((variant) => (
                <div key={variant.color} className="flex items-center">
                  <RadioGroupItem
                    value={variant.color}
                    id={`color-${variant.color}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`color-${variant.color}`}
                    className={`flex h-8 w-8 items-center justify-center rounded-full border border-muted 
                    peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-primary 
                    hover:ring-1 hover:ring-muted-foreground cursor-pointer ${
                      isOutOfStock ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    style={{ backgroundColor: variant.color }}
                  >
                    {selectedColor === variant.color && (
                      <Check className="h-4 w-4 text-white drop-shadow-md" />
                    )}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        {availableSizes.length > 0 && (
          <div>
            <h3 className="font-medium mb-2">
              {product.category === "Perfumes" ? "Volume" : "Tamanho"}
            </h3>
            <RadioGroup
              value={selectedSize || ""}
              onValueChange={setSelectedSize}
              className="flex flex-wrap gap-2"
              disabled={isOutOfStock}
            >
              {availableSizes.map(({ size }) => (
                <div key={size} className="flex items-center">
                  <RadioGroupItem
                    value={size}
                    id={`size-${size}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`size-${size}`}
                    className={`flex ${product.category === "Perfumes" ? "h-12 w-16" : "h-10 w-10"} items-center justify-center rounded-md border border-gray-300 bg-white 
                    peer-data-[state=checked]:bg-black peer-data-[state=checked]:text-white 
                    cursor-pointer ${
                      isOutOfStock ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {size}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        {!isOutOfStock && (
          <div>
            <h3 className="font-medium mb-2">Quantidade</h3>
            <div className="flex items-center border rounded-md w-32 bg-white text-black">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="h-10 rounded-none"
                disabled={quantity <= 1}
              >
                -
              </Button>
              <div className="flex-1 text-center">{quantity}</div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  setQuantity(Math.min(maxQuantity, quantity + 1))
                }
                className="h-10 rounded-none"
                disabled={quantity >= maxQuantity || !selectedSize}
              >
                +
              </Button>
            </div>
            {quantity === maxQuantity && selectedSize && (
              <p className="text-xs text-muted-foreground mt-1 font-bold">
                Quantidade máxima disponível
              </p>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <Button
          onClick={handleAddToCart}
          className="flex-1 bg-[#000000] text-white hover:bg-[#808080]"
          disabled={isOutOfStock || addedToCart || !selectedSize}
        >
          {addedToCart ? (
            <>
              <Check className="mr-2 h-4 w-4" /> Adicionado
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-4 w-4" /> Adicionar ao Carrinho
            </>
          )}
        </Button>
        <Button
          onClick={handleBuyNow}
          variant="secondary"
          className="flex-1"
          disabled={isOutOfStock || !selectedSize}
        >
          Comprar Agora
        </Button>
      </div>
    </div>
  );
}