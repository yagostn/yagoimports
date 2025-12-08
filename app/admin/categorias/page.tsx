"use client";

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/admin/protected-route';
import AdminLayout from '@/components/admin/admin-layout';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Layers } from 'lucide-react';
import { db } from '@/lib/firebase/config';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

interface Category {
  id: string;
  nome: string;
  productCount: number;
}

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    loadCategorias();
  }, []);

  const loadCategorias = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'categorias'));
      const categoriasData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Category[];
      setCategorias(categoriasData);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!categoryName.trim()) {
      alert('Digite um nome para a categoria');
      return;
    }

    try {
      if (editingCategory) {
        await updateDoc(doc(db, 'categorias', editingCategory.id), {
          nome: categoryName
        });
      } else {
        await addDoc(collection(db, 'categorias'), {
          nome: categoryName,
          productCount: 0
        });
      }
      setShowModal(false);
      setCategoryName('');
      setEditingCategory(null);
      loadCategorias();
    } catch (error) {
      console.error('Erro ao salvar categoria:', error);
      alert('Erro ao salvar categoria');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta categoria?')) {
      try {
        await deleteDoc(doc(db, 'categorias', id));
        setCategorias(categorias.filter(c => c.id !== id));
      } catch (error) {
        console.error('Erro ao excluir categoria:', error);
        alert('Erro ao excluir categoria');
      }
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
                Categorias
              </h1>
              <p className="mt-2" style={{ color: 'oklch(0.5 0.05 265.755)' }}>
                Gerencie as categorias dos seus produtos
              </p>
            </div>
            <Button
              onClick={() => {
                setEditingCategory(null);
                setCategoryName('');
                setShowModal(true);
              }}
              className="gap-2"
              style={{ backgroundColor: 'oklch(0.208 0.042 265.755)' }}
            >
              <Plus className="w-4 h-4" />
              Nova Categoria
            </Button>
          </div>

          {/* Categories Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto"
                   style={{ borderColor: 'oklch(0.208 0.042 265.755)', borderTopColor: 'transparent' }} />
            </div>
          ) : categorias.length === 0 ? (
            <div className="text-center py-12 rounded-lg border"
                 style={{
                   backgroundColor: 'white',
                   borderColor: 'oklch(0.929 0.013 255.508)'
                 }}>
              <Layers className="w-12 h-12 mx-auto mb-4" style={{ color: 'oklch(0.5 0.05 265.755)' }} />
              <p style={{ color: 'oklch(0.5 0.05 265.755)' }}>
                Nenhuma categoria cadastrada
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categorias.map((categoria) => (
                <div
                  key={categoria.id}
                  className="p-6 rounded-lg border"
                  style={{
                    backgroundColor: 'white',
                    borderColor: 'oklch(0.929 0.013 255.508)'
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: 'oklch(0.9382 0.104 96.09)' }}
                    >
                      <Layers className="w-6 h-6" style={{ color: 'oklch(0.208 0.042 265.755)' }} />
                    </div>
                    <span className="text-sm px-3 py-1 rounded-full"
                          style={{
                            backgroundColor: 'oklch(0.9382 0.104 96.09)',
                            color: 'oklch(0.208 0.042 265.755)'
                          }}>
                      {categoria.productCount} produtos
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-4" 
                      style={{ color: 'oklch(0.208 0.042 265.755)' }}>
                    {categoria.nome}
                  </h3>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-2"
                      onClick={() => {
                        setEditingCategory(categoria);
                        setCategoryName(categoria.nome);
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
                      onClick={() => handleDelete(categoria.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'oklch(0.208 0.042 265.755)' }}>
                {editingCategory ? 'Editar Categoria' : 'Nova Categoria'}
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" 
                         style={{ color: 'oklch(0.208 0.042 265.755)' }}>
                    Nome da Categoria
                  </label>
                  <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border"
                    style={{
                      borderColor: 'oklch(0.929 0.013 255.508)'
                    }}
                    placeholder="Ex: Vestidos, Blusas, Calças..."
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleSave}
                    className="flex-1"
                    style={{ backgroundColor: 'oklch(0.208 0.042 265.755)' }}
                  >
                    Salvar
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowModal(false);
                      setCategoryName('');
                      setEditingCategory(null);
                    }}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </AdminLayout>
    </ProtectedRoute>
  );
}
