import type { CartItem } from "./types"
import { formatCurrency } from "./utils"

// Substitua pelo seu número de WhatsApp (com código do país)
const WHATSAPP_NUMBER = "5579981574965"

export function createWhatsAppLink(cart: CartItem[], paymentMethod?: "pix" | "cartao" | "dinheiro" | null): string {
  if (cart.length === 0) return ""

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  // Cria a mensagem para o WhatsApp
  let message = "Olá! Gostaria de fazer um pedido:\n\n"

  // Adiciona os itens do carrinho
  cart.forEach((item, index) => {
    message += `*${index + 1}. ${item.name}*\n`
    message += `   Quantidade: ${item.quantity}\n`
    if (item.size) message += `   Tamanho: ${item.size}\n`
    if (item.color) message += `   Cor: ${item.color}\n`
    message += `   Preço unitário: ${formatCurrency(item.price)}\n`
    message += `   Subtotal: ${formatCurrency(item.price * item.quantity)}\n\n`
  })

  // Adiciona o total
  message += `*Total do pedido: ${formatCurrency(subtotal)}*\n\n`

  // Adiciona o método de pagamento
  if (paymentMethod) {
    let paymentMethodText = ""

    switch (paymentMethod) {
      case "pix":
        paymentMethodText = "PIX"
        break
      case "cartao":
        paymentMethodText = "Cartão de Crédito"
        break
      case "debito":
        paymentMethodText = "Cartão de Débito"
        break
      case "dinheiro":
        paymentMethodText = "Dinheiro"
        break
    }

    message += `*Método de Pagamento: ${paymentMethodText}*\n\n`
  }

  message += "Gostaria de confirmar este pedido. Obrigado!"

  // Codifica a mensagem para URL
  const encodedMessage = encodeURIComponent(message)

  // Cria o link do WhatsApp
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
}

