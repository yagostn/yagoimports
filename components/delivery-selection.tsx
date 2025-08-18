"use client"

import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Truck, MapPin } from "lucide-react"

interface DeliveryInfo {
  rua: string
  numero: string
  bairro: string
  cidade: string
}

interface DeliverySelectionProps {
  deliveryType: "entrega" | "retirada" | null
  onDeliveryTypeChange: (type: "entrega" | "retirada") => void
  deliveryInfo: DeliveryInfo
  onDeliveryInfoChange: (info: DeliveryInfo) => void
}

export function DeliverySelection({
  deliveryType,
  onDeliveryTypeChange,
  deliveryInfo,
  onDeliveryInfoChange
}: DeliverySelectionProps) {
  const handleInputChange = (field: keyof DeliveryInfo, value: string) => {
    onDeliveryInfoChange({
      ...deliveryInfo,
      [field]: value
    })
  }

  return (
    <Card className="p-4 space-y-4">
      <h3 className="font-medium mb-3">Forma de Recebimento</h3>
      
      <RadioGroup
        value={deliveryType || ""}
        onValueChange={(value) => onDeliveryTypeChange(value as "entrega" | "retirada")}
      >
        <div className="flex items-center space-x-2 mb-2">
          <RadioGroupItem value="entrega" id="entrega" />
          <Label htmlFor="entrega" className="flex items-center cursor-pointer">
            <Truck className="h-4 w-4 mr-2" />
            Entrega
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="retirada" id="retirada" />
          <Label htmlFor="retirada" className="flex items-center cursor-pointer">
            <MapPin className="h-4 w-4 mr-2" />
            Retirada
          </Label>
        </div>
      </RadioGroup>

      {deliveryType === "entrega" && (
        <div className="space-y-3 mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-sm">Endereço para Entrega:</h4>
          
          <div className="grid grid-cols-1 gap-3">
            <input
              type="text"
              placeholder="Rua"
              value={deliveryInfo.rua}
              onChange={(e) => handleInputChange("rua", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            
            <input
              type="text"
              placeholder="Número"
              value={deliveryInfo.numero}
              onChange={(e) => handleInputChange("numero", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            
            <input
              type="text"
              placeholder="Bairro"
              value={deliveryInfo.bairro}
              onChange={(e) => handleInputChange("bairro", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            
            <input
              type="text"
              placeholder="Cidade"
              value={deliveryInfo.cidade}
              onChange={(e) => handleInputChange("cidade", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>
      )}

      {deliveryType === "retirada" && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-sm mb-2">Local de Retirada:</h4>
          <p className="text-sm text-gray-600">
            Rua 88, 03 Albano Franco,<br />
            Nossa Sra do Socorro-SE<br />
            49153-094 (Marcos Freire 2)
          </p>
        </div>
      )}
    </Card>
  )
}
