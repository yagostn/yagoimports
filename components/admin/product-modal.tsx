"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import { db } from '@/lib/firebase/config';
import { collection, addDoc, updateDoc, doc, getDocs } from 'firebase/firestore';
import { Product } from '@/lib/types';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  product?: Product | null;
}

const COLORS = [
  { name: 'Preto', hex: '#4A5568' },
  { name: 'Branco', hex: '#F7FAFC' },
  { name: 'Vermelho', hex: '#F56565' },
  { name: 'Rosa', hex: '#ED64A6' },
  { name: 'Rosa Bebê', hex: '#FBB6CE' },
  { name: 'Roxo', hex: '#9B59B6' },
  { name: 'Azul Royal', hex: '#6B8FD8' },
  { name: 'Azul Escuro', hex: '#5B72A8' },
  { name: 'Azul Cristal', hex: '#B8D4E8' },
  { name: 'Verde', hex: '#7FD89B' },
  { name: 'Amarelo', hex: '#F4E45C' },
  { name: 'Laranja', hex: '#E8AC6C' },
  { name: 'Marrom', hex: '#A8897C' },
  { name: 'Cinza', hex: '#9CA3A8' },
  { name: 'Bege', hex: '#E8E4D8' },
  { name: 'Off White', hex: '#F4F0E8' },
];

const SIZES = ['P', 'M', 'G', 'GG', 'U'];

export default function ProductModal({ isOpen, onClose, onSuccess, product }: ProductModalProps) {
  const [categorias, setCategorias] = useState<{ id: string; nome: string }[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    price: '' as string | number,
    originalPrice: '' as string | number,
    discount: '' as string | number,
    stock: '' as string | number,
    isNew: false,
    isPromo: false,
  });
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      console.log('Modal aberto, carregando categorias...');
      loadCategorias();
      
      if (product) {
        setFormData({
          name: product.name,
          category: product.category,
          description: product.description,
          price: product.price,
          originalPrice: product.originalPrice || '',
          discount: product.originalPrice 
            ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
            : '',
          stock: product.stock,
          isNew: product.isNew || false,
          isPromo: !!product.originalPrice,
        });
        setSelectedColors(product.colors || []);
      } else {
        // Resetar formulário para novo produto
        setFormData({
          name: '',
          category: '',
          description: '',
          price: '',
          originalPrice: '',
          discount: '',
          stock: '',
          isNew: false,
          isPromo: false,
        });
        setSelectedColors([]);
        setSelectedSizes([]);
        setImages([]);
      }
    }
  }, [product, isOpen]);

  const loadCategorias = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'categorias'));
      const categoriasData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        nome: doc.data().nome
      }));
      console.log('Categorias carregadas:', categoriasData);
      setCategorias(categoriasData);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  };

  const handleColorToggle = (colorName: string) => {
    if (selectedColors.includes(colorName)) {
      setSelectedColors(selectedColors.filter(c => c !== colorName));
    } else {
      setSelectedColors([...selectedColors, colorName]);
    }
  };

  const handleSizeToggle = (size: string) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages(files);
    }
  };

  const uploadImages = async () => {
    const imageUrls: string[] = [];
    
    for (const image of images) {
      const formData = new FormData();
      formData.append('file', image);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Erro ao fazer upload da imagem');
      }

      const data = await response.json();
      imageUrls.push(data.url);
    }
    
    return imageUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar valores numéricos
    const price = parseFloat(formData.price?.toString() || '0');
    const originalPrice = parseFloat(formData.originalPrice?.toString() || '0');
    const stock = parseInt(formData.stock?.toString() || '0');
    
    if (isNaN(price) || price <= 0) {
      alert('⚠️ Digite um preço válido');
      return;
    }
    
    if (isNaN(stock) || stock <= 0) {
      alert('⚠️ ADICIONE ESTOQUE PRIMEIRO PARA SELECIONAR TAMANHOS E CORES');
      return;
    }

    if (selectedSizes.length === 0) {
      alert('⚠️ SELECIONE PELO MENOS UM TAMANHO');
      return;
    }

    if (selectedColors.length === 0) {
      alert('⚠️ SELECIONE PELO MENOS UMA COR');
      return;
    }

    setLoading(true);
    try {
      let imageUrls: string[] = product?.images || [];
      
      // Tentar fazer upload das imagens, mas continuar mesmo se falhar
      if (images.length > 0) {
        try {
          imageUrls = await uploadImages();
        } catch (uploadError: any) {
          console.error('Erro ao fazer upload das imagens:', uploadError);
          
          // Se for erro de CORS, informar e perguntar se quer continuar sem imagens
          if (uploadError?.message?.includes('CORS') || uploadError?.code === 'storage/unauthorized') {
            const continuar = confirm(
              '⚠️ Erro ao fazer upload das imagens (problema de CORS no Firebase Storage).\n\n' +
              'Deseja salvar o produto SEM as imagens por enquanto?\n\n' +
              'Você poderá adicionar as imagens depois configurando o CORS.'
            );
            
            if (!continuar) {
              setLoading(false);
              return;
            }
            
            // Usar imagem placeholder se não tiver imagens
            if (imageUrls.length === 0) {
              imageUrls = ['https://via.placeholder.com/400x400?text=Sem+Imagem'];
            }
          } else {
            throw uploadError;
          }
        }
      } else if (imageUrls.length === 0) {
        // Se não tem imagens selecionadas e nem imagens existentes, usar placeholder
        imageUrls = ['https://via.placeholder.com/400x400?text=Sem+Imagem'];
      }

      const productData: any = {
        name: formData.name,
        category: formData.category,
        description: formData.description,
        price: price,
        images: imageUrls,
        colors: selectedColors,
        sizes: selectedSizes,
        stock: stock,
        isNew: formData.isNew,
        variants: [],
        featured: false,
      };

      // Só adiciona originalPrice se for promoção e tiver valor válido
      if (formData.isPromo && originalPrice > 0) {
        productData.originalPrice = originalPrice;
      }

      if (product) {
        await updateDoc(doc(db, 'produtos', product.id), productData);
      } else {
        await addDoc(collection(db, 'produtos'), productData);
      }

      alert('✅ Produto salvo com sucesso!');
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Erro ao salvar produto:', error);
      alert(`❌ Erro ao salvar produto: ${error?.message || 'Erro desconhecido'}`);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-3xl my-8" style={{ backgroundColor: 'oklch(0.98 0.02 96)' }}>
        <div className="p-4 border-b flex justify-between items-center" style={{ borderColor: 'oklch(0.929 0.013 255.508)' }}>
          <h2 className="text-xl font-bold uppercase tracking-wide" style={{ color: 'oklch(0.208 0.042 265.755)' }}>
            {product ? 'Editar Produto' : 'Novo Produto'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Nome e Categoria */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-medium uppercase tracking-wide" style={{ color: 'oklch(0.208 0.042 265.755)' }}>
                Nome *
              </Label>
              <Input
                placeholder="Nome do produto"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="mt-1 text-sm"
              />
            </div>
            <div>
              <Label className="text-xs font-medium uppercase tracking-wide" style={{ color: 'oklch(0.208 0.042 265.755)' }}>
                Categoria *
              </Label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
                style={{ borderColor: 'oklch(0.929 0.013 255.508)' }}
              >
                <option value="">Selecione uma categoria</option>
                {categorias.map(cat => (
                  <option key={cat.id} value={cat.nome}>{cat.nome}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Descrição */}
          <div>
            <Label className="text-xs font-medium uppercase tracking-wide" style={{ color: 'oklch(0.208 0.042 265.755)' }}>
              Descrição
            </Label>
            <Textarea
              placeholder="Descrição detalhada do produto..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="mt-1 text-sm"
            />
          </div>

          {/* Preços e Estoque */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <Label className="text-xs font-medium uppercase tracking-wide" style={{ color: 'oklch(0.208 0.042 265.755)' }}>
                Preço Atual *
              </Label>
              <Input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={formData.price || ''}
                onChange={(e) => setFormData({ ...formData, price: e.target.value ? parseFloat(e.target.value) : 0 })}
                required
                className="mt-1 text-sm"
              />
            </div>
            <div>
              <Label className="text-xs font-medium uppercase tracking-wide" style={{ color: 'oklch(0.208 0.042 265.755)' }}>
                Preço Original
              </Label>
              <Input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={formData.originalPrice || ''}
                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value ? parseFloat(e.target.value) : 0 })}
                className="mt-1 text-sm"
              />
            </div>
            <div>
              <Label className="text-xs font-medium uppercase tracking-wide" style={{ color: 'oklch(0.208 0.042 265.755)' }}>
                Desconto (%)
              </Label>
              <Input
                type="number"
                min="0"
                max="100"
                placeholder="0"
                value={formData.discount || ''}
                onChange={(e) => {
                  const discount = e.target.value ? parseInt(e.target.value) : 0;
                  const price = formData.price || 0;
                  const originalPrice = price > 0 && discount > 0 ? price / (1 - discount / 100) : 0;
                  setFormData({ ...formData, discount, originalPrice });
                }}
                className="mt-1 text-sm"
              />
            </div>
            <div>
              <Label className="text-xs font-medium uppercase tracking-wide" style={{ color: 'oklch(0.208 0.042 265.755)' }}>
                Estoque *
              </Label>
              <Input
                type="number"
                min="0"
                placeholder="0"
                value={formData.stock || ''}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value ? parseInt(e.target.value) : 0 })}
                required
                className="mt-1 text-sm"
              />
            </div>
          </div>

          {/* Checkboxes */}
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isNew}
                onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-xs uppercase tracking-wide" style={{ color: 'oklch(0.208 0.042 265.755)' }}>Produto Novo</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isPromo}
                onChange={(e) => setFormData({ ...formData, isPromo: e.target.checked })}
                className="w-4 h-4"
              />
              <span className="text-xs uppercase tracking-wide" style={{ color: 'oklch(0.208 0.042 265.755)' }}>Em Promoção</span>
            </label>
          </div>

          {/* Tamanhos Disponíveis */}
          <div>
            <Label className="text-xs font-medium uppercase tracking-wide" style={{ color: 'oklch(0.208 0.042 265.755)' }}>
              Tamanhos Disponíveis
            </Label>
            <p className="text-xs mt-1 mb-2 uppercase" style={{ color: 'oklch(0.5 0.05 265.755)' }}>
              Selecione até 0 tamanho(s) de acordo com o estoque
            </p>
            <div className="flex gap-2">
              {SIZES.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleSizeToggle(size)}
                  disabled={formData.stock === 0}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                    selectedSizes.includes(size)
                      ? 'text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  } ${formData.stock === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  style={{
                    backgroundColor: selectedSizes.includes(size) ? 'oklch(0.208 0.042 265.755)' : undefined,
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
            {formData.stock === 0 && (
              <p className="text-xs mt-2 text-red-600 font-medium">
                ⚠️ ADICIONE ESTOQUE PRIMEIRO PARA SELECIONAR TAMANHOS
              </p>
            )}
          </div>

          {/* Cores Disponíveis */}
          <div>
            <Label className="text-xs font-medium uppercase tracking-wide" style={{ color: 'oklch(0.208 0.042 265.755)' }}>
              Cores Disponíveis
            </Label>
            <p className="text-xs mt-1 mb-3 uppercase" style={{ color: 'oklch(0.5 0.05 265.755)' }}>
              Selecione até 0 cor(es) de acordo com o estoque
            </p>
            <div className="grid grid-cols-5 gap-3">
              {COLORS.map((color) => (
                <div
                  key={color.name}
                  onClick={() => formData.stock > 0 && handleColorToggle(color.name)}
                  className={`flex flex-col items-center gap-2 p-2 rounded-lg transition-all ${
                    selectedColors.includes(color.name)
                      ? 'ring-2 ring-offset-2'
                      : 'hover:bg-gray-50'
                  } ${formData.stock === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  style={{
                    ringColor: selectedColors.includes(color.name) ? 'oklch(0.208 0.042 265.755)' : undefined,
                    border: '1px solid oklch(0.929 0.013 255.508)',
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-full"
                    style={{ 
                      backgroundColor: color.hex,
                      border: color.name === 'Branco' ? '1px solid #E2E8F0' : 'none'
                    }}
                  />
                  <span className="text-xs text-center uppercase" style={{ color: 'oklch(0.5 0.05 265.755)' }}>
                    {color.name}
                  </span>
                </div>
              ))}
            </div>
            {formData.stock === 0 && (
              <p className="text-xs mt-2 text-red-600 font-medium">
                ⚠️ ADICIONE ESTOQUE PRIMEIRO PARA SELECIONAR CORES
              </p>
            )}
          </div>

          {/* Imagens do Produto */}
          <div>
            <Label className="text-xs font-medium uppercase tracking-wide" style={{ color: 'oklch(0.208 0.042 265.755)' }}>
              Imagens do Produto
            </Label>
            <div className="mt-2 border-2 border-dashed rounded-lg p-4 text-center" 
                 style={{ borderColor: 'oklch(0.929 0.013 255.508)' }}>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Button 
                  type="button" 
                  onClick={() => document.getElementById('image-upload')?.click()}
                  size="sm"
                  style={{ backgroundColor: 'oklch(0.208 0.042 265.755)' }}
                >
                  Escolher Arquivos
                </Button>
                <p className="text-xs mt-2" style={{ color: 'oklch(0.5 0.05 265.755)' }}>
                  {images.length > 0 ? `${images.length} arquivo(s) selecionado(s)` : 'Nenhum arquivo escolhido'}
                </p>
              </label>
              <p className="text-xs mt-2" style={{ color: 'oklch(0.5 0.05 265.755)' }}>
                Formatos aceitos: JPG, PNG, WEBP. Máximo 20MB por imagem. Você pode selecionar múltiplas imagens de uma vez
              </p>
            </div>
          </div>
        </form>

        {/* Botões */}
        <div className="flex gap-3 justify-end p-4 border-t" style={{ borderColor: 'oklch(0.929 0.013 255.508)' }}>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="px-8"
            style={{ color: 'oklch(0.208 0.042 265.755)' }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              const form = document.querySelector('form');
              if (form) {
                const event = new Event('submit', { bubbles: true, cancelable: true });
                form.dispatchEvent(event);
              }
            }}
            className="px-8"
            style={{ backgroundColor: 'oklch(0.208 0.042 265.755)' }}
          >
            {loading ? 'Salvando...' : product ? 'Salvar Alterações' : 'Criar Produto'}
          </Button>
        </div>
      </div>
    </div>
  );
}
