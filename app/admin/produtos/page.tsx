"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ProtectedRoute from '@/components/admin/protected-route';
import AdminLayout from '@/components/admin/admin-layout';
import ProductModal from '@/components/admin/product-modal';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { db } from '@/lib/firebase/config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Product } from '@/lib/types';

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadProdutos();
  }, []);

  const loadProdutos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'produtos'));
      const produtosData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      setProdutos(produtosData);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await deleteDoc(doc(db, 'produtos', id));
        setProdutos(produtos.filter(p => p.id !== id));
      } catch (error) {
        console.error('Erro ao excluir produto:', error);
        alert('Erro ao excluir produto');
      }
    }
  };

  const filteredProdutos = produtos.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: 'oklch(0.208 0.042 265.755)' }}>
                Produtos
              </h1>
              <p className="mt-2" style={{ color: 'oklch(0.5 0.05 265.755)' }}>
                Gerencie seus produtos
              </p>
            </div>
            <Button
              onClick={() => {
                setEditingProduct(null);
                setShowModal(true);
              }}
              className="gap-2"
              style={{ backgroundColor: 'oklch(0.208 0.042 265.755)' }}
            >
              <Plus className="w-4 h-4" />
              Novo Produto
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" 
                   style={{ color: 'oklch(0.5 0.05 265.755)' }} />
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border"
              style={{
                backgroundColor: 'white',
                borderColor: 'oklch(0.929 0.013 255.508)'
              }}
            />
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto"
                   style={{ borderColor: 'oklch(0.208 0.042 265.755)', borderTopColor: 'transparent' }} />
            </div>
          ) : filteredProdutos.length === 0 ? (
            <div className="text-center py-12 rounded-lg border" 
                 style={{ 
                   backgroundColor: 'white',
                   borderColor: 'oklch(0.929 0.013 255.508)'
                 }}>
              <p style={{ color: 'oklch(0.5 0.05 265.755)' }}>
                Nenhum produto encontrado
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProdutos.map((produto) => (
                <div
                  key={produto.id}
                  className="rounded-lg border overflow-hidden"
                  style={{
                    backgroundColor: 'white',
                    borderColor: 'oklch(0.929 0.013 255.508)'
                  }}
                >
                  <div className="aspect-square bg-gray-100 relative">
                    {produto.images && produto.images[0] ? (
                      <Image
                        src={produto.images[0]}
                        alt={produto.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center" 
                           style={{ color: 'oklch(0.5 0.05 265.755)' }}>
                        Sem imagem
                      </div>
                    )}
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold line-clamp-1" 
                          style={{ color: 'oklch(0.208 0.042 265.755)' }}>
                        {produto.name}
                      </h3>
                      <p className="text-sm mt-1" style={{ color: 'oklch(0.5 0.05 265.755)' }}>
                        {produto.category}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold" style={{ color: 'oklch(0.208 0.042 265.755)' }}>
                        R$ {produto.price.toFixed(2)}
                      </span>
                      <span className="text-sm" style={{ color: 'oklch(0.5 0.05 265.755)' }}>
                        Estoque: {produto.stock}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-2"
                        onClick={() => {
                          setEditingProduct(produto);
                          setShowModal(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                        Editar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:bg-red-50"
                        onClick={() => handleDelete(produto.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal de Adicionar/Editar */}
        <ProductModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setEditingProduct(null);
          }}
          onSuccess={loadProdutos}
          product={editingProduct}
        />
      </AdminLayout>
    </ProtectedRoute>
  );
}
