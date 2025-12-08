"use client";

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/admin/protected-route';
import AdminLayout from '@/components/admin/admin-layout';
import VendaModal from '@/components/admin/venda-modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Package, Plus } from 'lucide-react';
import { db } from '@/lib/firebase/config';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

interface Venda {
  id: string;
  vendaId: string;
  cliente: string;
  data: string;
  total: number;
  status: 'pendente' | 'confirmado' | 'enviado' | 'entregue' | 'cancelado';
  itens: {
    produto: string;
    quantidade: number;
    preco: number;
  }[];
  pagamento: string;
}

const statusColors = {
  pendente: 'oklch(0.828 0.189 84.429)',
  confirmado: 'oklch(0.6 0.118 184.704)',
  enviado: 'oklch(0.398 0.07 227.392)',
  entregue: 'oklch(0.7 0.15 145)',
  cancelado: 'oklch(0.577 0.245 27.325)'
};

export default function VendasPage() {
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVenda, setSelectedVenda] = useState<Venda | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadVendas();
  }, []);

  const loadVendas = async () => {
    try {
      const q = query(collection(db, 'vendas'), orderBy('data', 'desc'));
      const querySnapshot = await getDocs(q);
      const vendasData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Venda[];
      setVendas(vendasData);
    } catch (error) {
      console.error('Erro ao carregar vendas:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: 'oklch(0.208 0.042 265.755)' }}>
                Vendas
              </h1>
              <p className="mt-2" style={{ color: 'oklch(0.5 0.05 265.755)' }}>
                Gerencie todas as vendas da loja
              </p>
            </div>
            <Button
              onClick={() => setShowModal(true)}
              className="gap-2"
              style={{ backgroundColor: 'oklch(0.208 0.042 265.755)' }}
            >
              <Plus className="w-4 h-4" />
              Nova Venda
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg border"
                 style={{
                   backgroundColor: 'white',
                   borderColor: 'oklch(0.929 0.013 255.508)'
                 }}>
              <p className="text-sm" style={{ color: 'oklch(0.5 0.05 265.755)' }}>Total de Vendas</p>
              <p className="text-2xl font-bold mt-1" style={{ color: 'oklch(0.208 0.042 265.755)' }}>
                {vendas.length}
              </p>
            </div>
            <div className="p-4 rounded-lg border"
                 style={{
                   backgroundColor: 'white',
                   borderColor: 'oklch(0.929 0.013 255.508)'
                 }}>
              <p className="text-sm" style={{ color: 'oklch(0.5 0.05 265.755)' }}>Pendentes</p>
              <p className="text-2xl font-bold mt-1" style={{ color: statusColors.pendente }}>
                {vendas.filter(v => v.status === 'pendente').length}
              </p>
            </div>
            <div className="p-4 rounded-lg border"
                 style={{
                   backgroundColor: 'white',
                   borderColor: 'oklch(0.929 0.013 255.508)'
                 }}>
              <p className="text-sm" style={{ color: 'oklch(0.5 0.05 265.755)' }}>Em Andamento</p>
              <p className="text-2xl font-bold mt-1" style={{ color: statusColors.enviado }}>
                {vendas.filter(v => v.status === 'confirmado' || v.status === 'enviado').length}
              </p>
            </div>
            <div className="p-4 rounded-lg border"
                 style={{
                   backgroundColor: 'white',
                   borderColor: 'oklch(0.929 0.013 255.508)'
                 }}>
              <p className="text-sm" style={{ color: 'oklch(0.5 0.05 265.755)' }}>Entregues</p>
              <p className="text-2xl font-bold mt-1" style={{ color: statusColors.entregue }}>
                {vendas.filter(v => v.status === 'entregue').length}
              </p>
            </div>
          </div>

          {/* Vendas List */}
          {loading ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto"
                   style={{ borderColor: 'oklch(0.208 0.042 265.755)', borderTopColor: 'transparent' }} />
            </div>
          ) : vendas.length === 0 ? (
            <div className="text-center py-12 rounded-lg border"
                 style={{
                   backgroundColor: 'white',
                   borderColor: 'oklch(0.929 0.013 255.508)'
                 }}>
              <Package className="w-12 h-12 mx-auto mb-4" style={{ color: 'oklch(0.5 0.05 265.755)' }} />
              <p style={{ color: 'oklch(0.5 0.05 265.755)' }}>
                Nenhuma venda registrada
              </p>
            </div>
          ) : (
            <div className="rounded-lg border overflow-hidden"
                 style={{
                   backgroundColor: 'white',
                   borderColor: 'oklch(0.929 0.013 255.508)'
                 }}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead style={{ backgroundColor: 'oklch(0.9382 0.104 96.09)' }}>
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold"
                          style={{ color: 'oklch(0.208 0.042 265.755)' }}>
                        Pedido
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold"
                          style={{ color: 'oklch(0.208 0.042 265.755)' }}>
                        Cliente
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold"
                          style={{ color: 'oklch(0.208 0.042 265.755)' }}>
                        Data
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold"
                          style={{ color: 'oklch(0.208 0.042 265.755)' }}>
                        Total
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold"
                          style={{ color: 'oklch(0.208 0.042 265.755)' }}>
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold"
                          style={{ color: 'oklch(0.208 0.042 265.755)' }}>
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{ borderColor: 'oklch(0.929 0.013 255.508)' }}>
                    {vendas.map((venda) => (
                      <tr key={venda.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium"
                            style={{ color: 'oklch(0.208 0.042 265.755)' }}>
                          {venda.vendaId}
                        </td>
                        <td className="px-6 py-4 text-sm" style={{ color: 'oklch(0.5 0.05 265.755)' }}>
                          {venda.cliente}
                        </td>
                        <td className="px-6 py-4 text-sm" style={{ color: 'oklch(0.5 0.05 265.755)' }}>
                          {new Date(venda.data).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium"
                            style={{ color: 'oklch(0.208 0.042 265.755)' }}>
                          R$ {venda.total.toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className="px-3 py-1 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: `${statusColors[venda.status]}20`,
                              color: statusColors[venda.status]
                            }}
                          >
                            {venda.status.charAt(0).toUpperCase() + venda.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedVenda(venda)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Modal de Detalhes */}
        {selectedVenda && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto p-6">
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'oklch(0.208 0.042 265.755)' }}>
                Detalhes do Pedido {selectedVenda.vendaId}
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium" style={{ color: 'oklch(0.5 0.05 265.755)' }}>
                    Cliente
                  </p>
                  <p style={{ color: 'oklch(0.208 0.042 265.755)' }}>{selectedVenda.cliente}</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2" style={{ color: 'oklch(0.5 0.05 265.755)' }}>
                    Itens
                  </p>
                  <div className="space-y-2">
                    {selectedVenda.itens.map((item, index) => (
                      <div key={index} className="flex justify-between p-3 rounded-lg"
                           style={{ backgroundColor: 'oklch(0.98 0.02 96)' }}>
                        <span style={{ color: 'oklch(0.208 0.042 265.755)' }}>
                          {item.produto} x{item.quantidade}
                        </span>
                        <span className="font-medium" style={{ color: 'oklch(0.208 0.042 265.755)' }}>
                          R$ {(item.preco * item.quantidade).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t" style={{ borderColor: 'oklch(0.929 0.013 255.508)' }}>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold" style={{ color: 'oklch(0.208 0.042 265.755)' }}>
                      Total
                    </span>
                    <span className="text-2xl font-bold" style={{ color: 'oklch(0.208 0.042 265.755)' }}>
                      R$ {selectedVenda.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => setSelectedVenda(null)}
                className="w-full mt-6"
                style={{ backgroundColor: 'oklch(0.208 0.042 265.755)' }}
              >
                Fechar
              </Button>
            </div>
          </div>
        )}

        {/* Modal de Nova Venda */}
        <VendaModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSuccess={loadVendas}
        />
      </AdminLayout>
    </ProtectedRoute>
  );
}
