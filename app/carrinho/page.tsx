"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/lib/use-cart"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { formatCurrency } from "@/lib/utils"
import { Trash2, ShoppingBag, ArrowRight, CreditCard, QrCode, Banknote } from "lucide-react"
import { createWhatsAppLink } from "@/lib/whatsapp"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart()
  const [mounted, setMounted] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "cartao" | "dinheiro" | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Seu Carrinho</h1>
        <p>Carregando...</p>
      </div>
    )
  }

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const isEmpty = cart.length === 0

  const handleCheckout = () => {
    if (!paymentMethod) {
      alert("Por favor, selecione um método de pagamento")
      return
    }

    const whatsappLink = createWhatsAppLink(cart, paymentMethod)
    window.open(whatsappLink, "_blank")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Seu Carrinho</h1>

      {isEmpty ? (
        <div className="text-center py-16">
          <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-medium mb-2">Seu carrinho está vazio</h2>
          <p className="text-muted-foreground mb-8">Parece que você ainda não adicionou nenhum item ao seu carrinho.</p>
          <Link href="/">
            <Button>Continuar Comprando</Button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={`${item.id}-${item.size}-${item.color}`} className="p-4 flex gap-4">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <h3 className="font-medium truncate">{item.name}</h3>
                    <div className="font-bold">{formatCurrency(item.price * item.quantity)}</div>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {item.size && <span className="mr-2">Tamanho: {item.size}</span>}
                    {item.color && (
                      <span className="inline-flex items-center">
                        Cor:
                        <span
                          className="inline-block w-3 h-3 rounded-full ml-1"
                          style={{ backgroundColor: item.color }}
                        />
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center border rounded-md">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => updateQuantity(item, Math.max(1, item.quantity - 1))}
                        className="h-8 w-8 rounded-none"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </Button>
                      <div className="w-8 text-center">{item.quantity}</div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => updateQuantity(item, item.quantity + 1)}
                        className="h-8 w-8 rounded-none"
                      >
                        +
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item)}
                      className="h-8 w-8 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}

            <div className="flex justify-between items-center mt-4">
              <Button variant="outline" onClick={clearCart}>
                Limpar Carrinho
              </Button>
              <Link href="/">
                <Button variant="ghost">Continuar Comprando</Button>
              </Link>
            </div>
          </div>

          <div>
            <Card className="p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between font-bold mb-4">
                  <span>Total</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>

                <div className="mb-6">
                  <h3 className="font-medium mb-3">Método de Pagamento</h3>
                  <RadioGroup
                    value={paymentMethod || ""}
                    onValueChange={(value) => setPaymentMethod(value as "pix" | "cartao" | "dinheiro")}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="pix" id="pix" />
                      <Label htmlFor="pix" className="flex items-center cursor-pointer">
                        <QrCode className="h-4 w-4 mr-2" />
                        PIX
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="cartao" id="cartao" />
                      <Label htmlFor="cartao" className="flex items-center cursor-pointer">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Cartão de Crédito
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="debito" id="debito" />
                      <Label htmlFor="cartao" className="flex items-center cursor-pointer">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Cartão de Débito
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dinheiro" id="dinheiro" />
                      <Label htmlFor="dinheiro" className="flex items-center cursor-pointer">
                        <Banknote className="h-4 w-4 mr-2" />
                        Dinheiro
                      </Label>
                    </div>
                  </RadioGroup>
                  {!paymentMethod && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Selecione um método de pagamento para continuar
                    </p>
                  )}
                </div>

                <Button onClick={handleCheckout} className="w-full" size="lg" disabled={!paymentMethod}>
                  Finalizar Compra <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Ao finalizar, você será redirecionado para o WhatsApp para confirmar seu pedido.
                </p>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

