# 📚 Exemplos de Uso - Painel Admin

## 🔐 Autenticação

### Login
```typescript
// O sistema de login já está implementado
// Acesse: http://localhost:3000/admin/login
// Use o email e senha criados no Firebase
```

### Logout
```typescript
// Clique no botão "Sair" no menu lateral
// O usuário será redirecionado para a tela de login
```

---

## 📦 Gerenciamento de Produtos

### Estrutura de Produto no Firestore

```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  sizes: string[];
  colors: string[];
  stock: number;
  isNew?: boolean;
  featured?: boolean;
  variants: Variant[];
  colorImages?: { [color: string]: string };
}
```

### Adicionar Produto Manualmente (Firestore Console)

```javascript
{
  "name": "Vestido Elegante",
  "description": "Vestido longo para ocasiões especiais",
  "price": 299.90,
  "originalPrice": 399.90,
  "images": [
    "https://exemplo.com/imagem1.jpg",
    "https://exemplo.com/imagem2.jpg"
  ],
  "category": "Vestidos",
  "sizes": ["P", "M", "G"],
  "colors": ["Preto", "Vermelho"],
  "stock": 15,
  "isNew": true,
  "featured": true,
  "variants": [
    {
      "color": "Preto",
      "image": "https://exemplo.com/preto.jpg",
      "sizes": [
        { "size": "P", "stock": 5 },
        { "size": "M", "stock": 5 },
        { "size": "G", "stock": 5 }
      ]
    }
  ]
}
```

---

## 🏷️ Gerenciamento de Categorias

### Estrutura de Categoria

```typescript
interface Category {
  id: string;
  name: string;
  productCount: number;
}
```

### Adicionar Categoria via Painel

1. Acesse `/admin/categorias`
2. Clique em "Nova Categoria"
3. Digite o nome da categoria
4. Clique em "Salvar"

### Adicionar Categoria Manualmente (Firestore Console)

```javascript
{
  "name": "Vestidos",
  "productCount": 0
}
```

### Categorias Sugeridas

```javascript
const categorias = [
  "Vestidos",
  "Blusas",
  "Calças",
  "Shorts",
  "Saias",
  "Conjuntos",
  "Moda Praia",
  "Acessórios",
  "Calçados",
  "Bolsas"
];
```

---

## 🛒 Gerenciamento de Vendas

### Estrutura de Venda

```typescript
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
  endereco?: {
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    cep: string;
  };
}
```

### Adicionar Venda Manualmente (Firestore Console)

```javascript
{
  "vendaId": "VN0001",
  "cliente": "João Silva",
  "data": "2024-01-15T10:30:00",
  "total": 299.90,
  "status": "pendente",
  "pagamento": "PIX",
  "itens": [
    {
      "produto": "Vestido Elegante",
      "quantidade": 1,
      "preco": 299.90
    }
  ],
  "endereco": {
    "rua": "Rua das Flores",
    "numero": "123",
    "bairro": "Centro",
    "cidade": "São Paulo",
    "cep": "01234-567"
  }
}
```

---

## 🎨 Customização de Cores

### Modificar Cores do Painel

Edite o arquivo `app/globals.css`:

```css
:root {
  --primary: oklch(0.208 0.042 265.755);  /* Roxo principal */
  --background: oklch(0.9382 0.104 96.09); /* Rosa claro */
  /* ... outras cores */
}
```

### Cores Disponíveis

```typescript
const cores = {
  primaria: 'oklch(0.208 0.042 265.755)',    // Roxo
  background: 'oklch(0.9382 0.104 96.09)',   // Rosa claro
  texto: 'oklch(0% 0 100.06)',               // Preto
  textoSecundario: 'oklch(0.5 0.05 265.755)', // Cinza
  border: 'oklch(0.929 0.013 255.508)',      // Cinza claro
  sucesso: 'oklch(0.7 0.15 145)',            // Verde
  erro: 'oklch(0.577 0.245 27.325)',         // Vermelho
  alerta: 'oklch(0.828 0.189 84.429)',       // Amarelo
  info: 'oklch(0.6 0.118 184.704)',          // Azul
};
```

---

## 🔥 Queries do Firestore

### Buscar Todos os Produtos

```typescript
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

const produtos = await getDocs(collection(db, 'produtos'));
const produtosData = produtos.docs.map(doc => ({
  id: doc.id,
  ...doc.data()
}));
```

### Buscar Produtos por Categoria

```typescript
import { collection, query, where, getDocs } from 'firebase/firestore';

const q = query(
  collection(db, 'produtos'),
  where('category', '==', 'Vestidos')
);
const produtos = await getDocs(q);
```

### Buscar Produtos em Destaque

```typescript
const q = query(
  collection(db, 'produtos'),
  where('featured', '==', true)
);
const produtos = await getDocs(q);
```

### Ordenar Produtos por Preço

```typescript
import { orderBy } from 'firebase/firestore';

const q = query(
  collection(db, 'produtos'),
  orderBy('price', 'asc') // ou 'desc'
);
const produtos = await getDocs(q);
```

---

## 📊 Upload de Imagens

### Upload para Firebase Storage

```typescript
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase/config';

async function uploadImage(file: File, path: string) {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}

// Exemplo de uso
const file = event.target.files[0];
const url = await uploadImage(file, `produtos/${Date.now()}_${file.name}`);
```

---

## 🔔 Notificações (Futuro)

### Estrutura Recomendada

```typescript
interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}
```

---

## 🧪 Dados de Teste

### Script para Popular Banco (Execute no Console do Navegador)

```javascript
// Adicionar categorias de teste
const categorias = [
  { name: 'Vestidos', productCount: 5 },
  { name: 'Blusas', productCount: 8 },
  { name: 'Calças', productCount: 6 },
  { name: 'Conjuntos', productCount: 4 }
];

// Adicionar vendas de teste
const vendas = [
  {
    vendaId: 'VN0001',
    cliente: 'Maria Silva',
    data: '2024-01-15T10:30:00',
    total: 299.90,
    status: 'entregue',
    pagamento: 'PIX',
    itens: [
      { produto: 'Vestido Vic', quantidade: 1, preco: 79.99 }
    ]
  },
  {
    vendaId: 'VN0002',
    cliente: 'João Santos',
    data: '2024-01-16T14:20:00',
    total: 150.00,
    status: 'enviado',
    pagamento: 'Cartão',
    itens: [
      { produto: 'Body Agnes', quantidade: 5, preco: 30.00 }
    ]
  }
];
```

---

## 🎯 Boas Práticas

### 1. Validação de Dados

```typescript
function validateProduct(product: Product): boolean {
  if (!product.name || product.name.trim() === '') return false;
  if (!product.price || product.price <= 0) return false;
  if (!product.category) return false;
  if (!product.images || product.images.length === 0) return false;
  return true;
}
```

### 2. Tratamento de Erros

```typescript
try {
  await addDoc(collection(db, 'produtos'), produto);
  // Mostrar mensagem de sucesso
} catch (error) {
  console.error('Erro ao adicionar produto:', error);
  // Mostrar mensagem de erro ao usuário
}
```

### 3. Loading States

```typescript
const [loading, setLoading] = useState(false);

async function handleSave() {
  setLoading(true);
  try {
    // Operação
  } finally {
    setLoading(false);
  }
}
```

---

## 🔒 Segurança

### Regras Recomendadas (Firestore)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir leitura pública de produtos
    match /produtos/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Apenas admins podem gerenciar vendas
    match /vendas/{vendaId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

**Esses exemplos cobrem os casos de uso mais comuns do painel admin!** 🚀
