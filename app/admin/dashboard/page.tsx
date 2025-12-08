"use client";

import ProtectedRoute from '@/components/admin/protected-route';
import AdminLayout from '@/components/admin/admin-layout';
import { DollarSign, ShoppingBag, Package as PackageIcon, TrendingUp } from 'lucide-react';

const stats = [
  {
    title: 'Vendas Totais',
    value: 'R$ 0',
    description: '+0% vs mês passado',
    icon: DollarSign,
    color: 'oklch(0.208 0.042 265.755)'
  },
  {
    title: 'Pedidos',
    value: '0',
    description: 'Total realizados',
    icon: ShoppingBag,
    color: 'oklch(0.6 0.118 184.704)'
  },
  {
    title: 'Produtos',
    value: '0',
    description: 'Cadastrados',
    icon: PackageIcon,
    color: 'oklch(0.828 0.189 84.429)'
  },
  {
    title: 'Vendas Mensais',
    value: 'R$ 0',
    description: 'Mês atual',
    icon: TrendingUp,
    color: 'oklch(0.398 0.07 227.392)'
  }
];

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-4 md:space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold" style={{ color: 'oklch(0.208 0.042 265.755)' }}>
              Dashboard
            </h1>
            <p className="mt-1 md:mt-2 text-sm md:text-base" style={{ color: 'oklch(0.5 0.05 265.755)' }}>
              Visão geral do seu negócio e métricas importantes
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat) => (
              <div
                key={stat.title}
                className="p-4 md:p-6 rounded-lg border"
                style={{
                  backgroundColor: 'white',
                  borderColor: 'oklch(0.929 0.013 255.508)'
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-xs md:text-sm font-medium" style={{ color: 'oklch(0.5 0.05 265.755)' }}>
                      {stat.title}
                    </p>
                    <p className="mt-1 md:mt-2 text-2xl md:text-3xl font-bold" style={{ color: stat.color }}>
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs md:text-sm" style={{ color: 'oklch(0.6 0.05 265.755)' }}>
                      {stat.description}
                    </p>
                  </div>
                  <div
                    className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center flex-shrink-0 ml-2"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <stat.icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: stat.color }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Placeholder */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div
              className="p-6 rounded-lg border"
              style={{
                backgroundColor: 'white',
                borderColor: 'oklch(0.929 0.013 255.508)'
              }}
            >
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'oklch(0.208 0.042 265.755)' }}>
                Vendas dos Últimos 6 Meses
              </h3>
              <div className="h-64 flex items-center justify-center" style={{ color: 'oklch(0.5 0.05 265.755)' }}>
                Gráfico será exibido aqui
              </div>
            </div>

            <div
              className="p-6 rounded-lg border"
              style={{
                backgroundColor: 'white',
                borderColor: 'oklch(0.929 0.013 255.508)'
              }}
            >
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'oklch(0.208 0.042 265.755)' }}>
                Produtos Mais Vendidos
              </h3>
              <div className="h-64 flex items-center justify-center" style={{ color: 'oklch(0.5 0.05 265.755)' }}>
                Gráfico será exibido aqui
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
