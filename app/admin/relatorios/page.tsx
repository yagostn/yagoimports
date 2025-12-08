"use client";

import ProtectedRoute from '@/components/admin/protected-route';
import AdminLayout from '@/components/admin/admin-layout';
import { Button } from '@/components/ui/button';
import { Download, TrendingUp, TrendingDown } from 'lucide-react';

export default function RelatoriosPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: 'oklch(0.208 0.042 265.755)' }}>
                Relatórios
              </h1>
              <p className="mt-2" style={{ color: 'oklch(0.5 0.05 265.755)' }}>
                Análise detalhada de vendas e performance
              </p>
            </div>
            <Button className="gap-2" style={{ backgroundColor: 'oklch(0.208 0.042 265.755)' }}>
              <Download className="w-4 h-4" />
              Exportar
            </Button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-lg border"
                 style={{
                   backgroundColor: 'white',
                   borderColor: 'oklch(0.929 0.013 255.508)'
                 }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'oklch(0.5 0.05 265.755)' }}>
                    Receita Total
                  </p>
                  <p className="text-2xl font-bold mt-1" style={{ color: 'oklch(0.208 0.042 265.755)' }}>
                    R$ 0,00
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">0%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-lg border"
                 style={{
                   backgroundColor: 'white',
                   borderColor: 'oklch(0.929 0.013 255.508)'
                 }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'oklch(0.5 0.05 265.755)' }}>
                    Pedidos
                  </p>
                  <p className="text-2xl font-bold mt-1" style={{ color: 'oklch(0.208 0.042 265.755)' }}>
                    0
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">0%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-lg border"
                 style={{
                   backgroundColor: 'white',
                   borderColor: 'oklch(0.929 0.013 255.508)'
                 }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'oklch(0.5 0.05 265.755)' }}>
                    Ticket Médio
                  </p>
                  <p className="text-2xl font-bold mt-1" style={{ color: 'oklch(0.208 0.042 265.755)' }}>
                    R$ 0,00
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingDown className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">0%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-lg border"
                 style={{
                   backgroundColor: 'white',
                   borderColor: 'oklch(0.929 0.013 255.508)'
                 }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'oklch(0.5 0.05 265.755)' }}>
                    Produtos Vendidos
                  </p>
                  <p className="text-2xl font-bold mt-1" style={{ color: 'oklch(0.208 0.042 265.755)' }}>
                    0
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">0%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg border"
                 style={{
                   backgroundColor: 'white',
                   borderColor: 'oklch(0.929 0.013 255.508)'
                 }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'oklch(0.208 0.042 265.755)' }}>
                Vendas dos Últimos 6 Meses
              </h3>
              <div className="h-64 flex items-center justify-center" 
                   style={{ color: 'oklch(0.5 0.05 265.755)' }}>
                <p>Gráfico de vendas mensais</p>
              </div>
            </div>

            <div className="p-6 rounded-lg border"
                 style={{
                   backgroundColor: 'white',
                   borderColor: 'oklch(0.929 0.013 255.508)'
                 }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'oklch(0.208 0.042 265.755)' }}>
                Vendas por Categoria
              </h3>
              <div className="h-64 flex items-center justify-center" 
                   style={{ color: 'oklch(0.5 0.05 265.755)' }}>
                <p>Gráfico de pizza com categorias</p>
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="p-6 rounded-lg border"
               style={{
                 backgroundColor: 'white',
                 borderColor: 'oklch(0.929 0.013 255.508)'
               }}>
            <h3 className="text-lg font-semibold mb-4" style={{ color: 'oklch(0.208 0.042 265.755)' }}>
              Produtos Mais Vendidos
            </h3>
            <div className="space-y-4">
              {[
                { name: 'Vestido Vic', vendas: 15, receita: 'R$ 1.199,85' },
                { name: 'Body Agnes', vendas: 12, receita: 'R$ 360,00' },
                { name: 'Vestido Red', vendas: 10, receita: 'R$ 499,90' },
                { name: 'Corselet', vendas: 8, receita: 'R$ 639,92' }
              ].map((produto, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg"
                     style={{ backgroundColor: 'oklch(0.98 0.02 96)' }}>
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-bold" 
                          style={{ color: 'oklch(0.208 0.042 265.755)' }}>
                      #{index + 1}
                    </span>
                    <div>
                      <p className="font-medium" style={{ color: 'oklch(0.208 0.042 265.755)' }}>
                        {produto.name}
                      </p>
                      <p className="text-sm" style={{ color: 'oklch(0.5 0.05 265.755)' }}>
                        {produto.vendas} unidades vendidas
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold" style={{ color: 'oklch(0.208 0.042 265.755)' }}>
                    {produto.receita}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
