import type { CartItem, DeliveryInfo, DeliveryType } from "./types"
import { formatCurrency } from "./utils"

// Substitua pelo seu número de WhatsApp (com código do país)
const WHATSAPP_NUMBER = "5579981574965"

// Color mapping to convert hex to readable name
const COLOR_MAP: { [key: string]: string } = {
  "#FF69B4": "Rosa bebê",
  "#FAF9F6": "Off White",
  "#89CFF0": "Azul Bebê",
  "#392620": "Marrom café",
  "#FFFF00": "Amarelo",
  "#C8E5EB": "Azul Cristal",
  "#00FFFF": "Ciano",
  "#A020F0": "Roxo",
  "#514240": "café",
  "#048000": "Verde Escuro",
  "#000080": "Azul Marinho",
  "#4169E1": "Azul Royal",
  "#5B3C1D": "Marrom",
  "#FF0000": "Vermelho",
  "#000000": "Preto",
  "#E2725B": "Telha",
  "#808080": "Cinza",
  "#EBC8B2": "Nude",
  "#FFFFFF": "Branco",
  "#0000FF": "Azul",
  "#F5F5DC": "Bege",
  "#084808": "Verde Escuro",

}

// Function to convert hex color to readable name
function getColorName(hexColor?: string): string {
  if (!hexColor) return ""
  return COLOR_MAP[hexColor.toUpperCase()] || hexColor
}

export function createWhatsAppLink(
  cart: CartItem[], 
  paymentMethod?: "pix" | "cartao" | "dinheiro" | "debito" | null,
  customerName?: string,
  customerPhone?: string,
  deliveryType?: DeliveryType,
  deliveryInfo?: DeliveryInfo
): string {
  if (cart.length === 0) return ""

  // Calculate totals
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0)

  // Get current date and time
  const currentDate = new Date()
  const formattedDate = currentDate.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

  // Create WhatsApp message
  let message = ` *YAGO IMPORTS* \n`
  message += ` *CONFIRMAÇÃO DE PEDIDO*\n\n`


  // Order Details
  message += ` *Data do Pedido:* ${formattedDate}\n\n`

  // Cart Items
  message += ` *ITENS DO PEDIDO:*\n`
  message += `━━━━━━━━━━\n`
  cart.forEach((item, index) => {
    message += `${index + 1}️⃣ *${item.name}*\n`
    message += `    Quantidade: ${item.quantity}\n`
    if (item.size) message += `    Tamanho: ${item.size}\n`
    if (item.color) message += `    Cor: ${getColorName(item.color)}\n`
    message += `    Valor: ${formatCurrency(item.price)}\n`
    message += `   ────────────────\n`
  })

  // Order Summary
  message += `\n *RESUMO DO PEDIDO:*\n`
  message += ` Total de Peças: *${totalQuantity}*\n`
  message += ` *VALOR TOTAL: ${formatCurrency(subtotal)}*\n\n`

  // Payment Method
  if (paymentMethod) {
    let paymentMethodText = ""
    let paymentIcon = ""

    switch (paymentMethod) {
      case "pix":
        paymentMethodText = "PIX"
        paymentIcon = ""
        break
      case "cartao":
        paymentMethodText = "Cartão de Crédito"
        paymentIcon = ""
        break
      case "debito":
        paymentMethodText = "Cartão de Débito"
        paymentIcon = ""
        break
      case "dinheiro":
        paymentMethodText = "Dinheiro"
        paymentIcon = ""
        break
    }

    message += `${paymentIcon} *MÉTODO DE PAGAMENTO:* ${paymentMethodText}\n\n`
  }

  // Delivery Information
  if (deliveryType) {
    message += `*FORMA DE RECEBIMENTO:*\n`
    
    if (deliveryType === "entrega") {
      message += ` *ENTREGA*\n\n`
      if (deliveryInfo && deliveryInfo.rua && deliveryInfo.numero && deliveryInfo.bairro && deliveryInfo.cidade) {
        message += `* Endereço de Entrega:*\n`
        message += `    ${deliveryInfo.rua}, ${deliveryInfo.numero}\n`
        message += `    Bairro: ${deliveryInfo.bairro}\n`
        message += `    Cidade: ${deliveryInfo.cidade}\n\n`
        message += ` *Prazo de Entrega:* Entraremos em contato para agendar\n`
        message += ` *Frete:* A combinar\n\n`
      }
    } else if (deliveryType === "retirada") {
      message += ` *RETIRADA*\n\n`
      message += `Rua 88, 03 Albano Franco,\n`
      message += `Nossa Sra do Socorro-SE\n`
      message += `49153-094 (Marcos Freire 2)\n\n`

    }
  }

  
  message += ` *Obrigado pela preferência!*\n`
  message += ` *YAGO IMPORTS!* `

  // Encode message for URL
  const encodedMessage = encodeURIComponent(message)

  // Create WhatsApp link
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
}
