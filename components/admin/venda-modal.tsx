"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import Image from 'next/image';
import { db } from '@/lib/firebase/config';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { Product } from '@/lib/types';

interface VendaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface ProdutoSelecionado {
  produto: Product;
  quantidade: number;
}

export default function VendaModal({ isOpen, onClose, onSuccess }: VendaModalProps) {
  const [produtos, setProdutos] = useState<Product[]>([]);
  const [produtosSelecionados, setProdutosSelecionados] = useState<ProdutoSelecionado[]>([]);
  const [cliente, setCliente] = useState('');
  const [pagamento, setPagamento] = useState('PIX');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadProdutos();
    }
  }, [isOpen]);

  const loadProdutos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'produtos'));
      const produtosData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      setProdutos(produtosData.filter(p => p.stock > 0));
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    }
  };

  const handleProdutoToggle = (produto: Product) => {
    const existe = produtosSelecionados.find(p => p.produto.id === produto.id);
    if (existe) {
      setProdutosSelecionados(produtosSelecionados.filter(p => p.produto.id !== produto.id));
    } else {
      setProdutosSelecionados([...produtosSelecionados, { produto, quantidade: 1 }]);
    }
  };

  const handleQuantidadeChange = (produtoId: string, quantidade: number) => {
    setProdutosSelecionados(
      produtosSelecionados.map(p =>
        p.produto.id === produtoId ? { ...p, quantidade: Math.max(1, Math.min(quantidade, p.produto.stock)) } : p
      )
    );
  };

  const calcularTotal = () => {
    return produtosSelecionados.reduce((total, item) => total + item.produto.price * item.quantidade, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (produtosSelecionados.length === 0) {
      alert('Selecione pelo menos um produto');
      return;
    }

    setLoading(true);
    try {
      const vendaData = {
        vendaId: `V${Date.now()}`,
        cliente,
        data: new Date().toISOString(),
        total: calcularTotal(),
        status: 'pendente',
        itens: produtosSelecionados.map(item => ({
          produto: item.produto.name,
          produtoId: item.produto.id,
          quantidade: item.quantidade,
          preco: item.produto.price,
        })),
        pagamento,
      };

      await addDoc(collection(db, 'vendas'), vendaData);
      
      onSuccess();
      onClose();
      setCliente('');
      setProdutosSelecionados([]);
    } catch (error) {
      console.error('Erro ao criar venda:', error);
      alert('Erro ao criar venda');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-4xl my-8" style={{ backgroundColor: 'oklch(0.98 0.02 96)' }}>
        <div className="p-6 border-b flex justify-between items-center" style={{ borderColor: 'oklch(0.929 0.013 255.508)' }}>
          <h2 className="text-2xl font-bold" style={{ color: 'oklch(0.208 0.042 265.755)' }}>
            Nova Venda
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Dados do Cliente */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: 'oklch(0.208 0.042 265.755)' }}>
              Dados do Cliente
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium" style={{ color: 'oklch(0.208 0.042 265.755)' }}>
                  Nome do Cliente *
                </Label>
                <Input
                  value={cliente}
                  onChange={(e) => setCliente(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-medium" style={{ color: 'oklch(0.208 0.042 265.755)' }}>
                  Forma de Pagamento *
                </Label>
                <select
                  value={pagamento}
                  onChange={(e) => setPagamento(e.target.value)}
                  required
                  className="w-full mt-1 px-3 py-2 border rounded-lg"
                  style={{ borderColor: 'oklch(0.929 0.013 255.508)' }}
                >
                  <option value="PIX">PIX</option>
                  <option value="Cartão de Crédito">Cartão de Crédito</option>
                  <option value="Cartão de Débito">Cartão de Débito</option>
                  <option value="Dinheiro">Dinheiro</option>
                </select>
              </div>
            </div>
          </div>

          {/* Adicionar Produtos */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: 'oklch(0.208 0.042 265.755)' }}>
              Adicionar Produtos
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto p-2">
              {produtos.map((produto) => {
                const selecionado = produtosSelecionados.find(p => p.produto.id === produto.id);
                return (
                  <div
                    key={produto.id}
                    onClick={() => handleProdutoToggle(produto)}
                    className={`relative border rounded-lg p-3 cursor-pointer transition-all ${
                      selecionado ? 'ring-2 ring-offset-2' : 'hover:shadow-md'
                    }`}
                    style={{
                      borderColor: 'oklch(0.929 0.013 255.508)',
                      ringColor: selecionado ? 'oklch(0.208 0.042 265.755)' : undefined,
                    }}
                  >
                    {produto.images && produto.images[0] && (
                      <div className="relative w-full h-32 mb-2">
                        <Image
                          src={produto.images[0]}
                          alt={produto.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                    )}
                    <h4 className="font-medium text-sm mb-1" style={{ color: 'oklch(0.208 0.042 265.755)' }}>
                      {produto.name}
                    </h4>
                    <p className="text-xs mb-1" style={{ color: 'oklch(0.5 0.05 265.755)' }}>
                      Estoque: {produto.stock}
                    </p>
                    <p className="text-sm font-bold" style={{ color: 'oklch(0.208 0.042 265.755)' }}>
                      R$ {produto.price.toFixed(2)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Produtos Selecionados */}
          {produtosSelecionados.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'oklch(0.208 0.042 265.755)' }}>
                Produtos Selecionados
              </h3>
              <div className="space-y-3">
                {produtosSelecionados.map((item) => (
                  <div
                    key={item.produto.id}
                    className="flex items-center gap-4 p-3 border rounded-lg"
                    style={{ borderColor: 'oklch(0.929 0.013 255.508)' }}
                  >
                    {item.produto.images && item.produto.images[0] && (
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={item.produto.images[0]}
                          alt={item.produto.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h4 className="font-medium" style={{ color: 'oklch(0.208 0.042 265.755)' }}>
                        {item.produto.name}
                      </h4>
                      <p className="text-sm" style={{ color: 'oklch(0.5 0.05 265.755)' }}>
                        R$ {item.produto.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Label className="text-sm">Qtd:</Label>
                      <Input
                        type="number"
                        min="1"
                        max={item.produto.stock}
                        value={item.quantidade}
                        onChange={(e) => handleQuantidadeChange(item.produto.id, parseInt(e.target.value))}
                        className="w-20"
                      />
                    </div>
                    <div className="text-right">
                      <p className="font-bold" style={{ color: 'oklch(0.208 0.042 265.755)' }}>
                        R$ {(item.produto.price * item.quantidade).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t flex justify-between items-center" 
                   style={{ borderColor: 'oklch(0.929 0.013 255.508)' }}>
                <span className="text-lg font-semibold" style={{ color: 'oklch(0.208 0.042 265.755)' }}>
                  Total:
                </span>
                <span className="text-2xl font-bold" style={{ color: 'oklch(0.208 0.042 265.755)' }}>
                  R$ {calcularTotal().toFixed(2)}
                </span>
              </div>
            </div>
          )}

          {/* Botões */}
          <div className="flex gap-3 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-6"
              style={{ color: 'oklch(0.208 0.042 265.755)' }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="px-6"
              style={{ backgroundColor: 'oklch(0.208 0.042 265.755)' }}
            >
              {loading ? 'Registrando...' : 'Registrar Venda'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
