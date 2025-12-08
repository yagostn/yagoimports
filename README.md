# 🛍️ Yago Imports - E-commerce & Admin Panel

E-commerce moderno de moda com painel administrativo integrado usando Next.js 15, Firebase e Tailwind CSS.

## ✨ Funcionalidades

### 🌐 Loja Online (Cliente)
- ✅ Catálogo de produtos responsivo
- ✅ Carrinho de compras
- ✅ Sistema de variantes (cores/tamanhos)
- ✅ Filtros por categoria
- ✅ Integração WhatsApp para finalização
- ✅ Layout moderno e responsivo

### 🔐 Painel Administrativo
- ✅ Sistema de autenticação (Firebase Auth)
- ✅ Dashboard com métricas
- ✅ Gerenciamento completo de categorias (CRUD)
- ✅ Gerenciamento de produtos
- ✅ Gerenciamento de vendas
- ✅ Relatórios e análises
- ✅ Design responsivo
- ✅ Interface intuitiva

## 🚀 Quick Start

### 1. Instalação

```bash
# Clone o repositório
git clone [seu-repositorio]

# Entre na pasta
cd yagoimports

# Instale as dependências
npm install
```

### 2. Configuração Firebase

**📖 Guia Completo: [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)**

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=sua-chave-aqui
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu-projeto-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=seu-app-id
```

### 3. Iniciar o Projeto

```bash
npm run dev
```

Acesse:
- **Loja**: http://localhost:3000
- **Admin**: http://localhost:3000/admin/login

## 📁 Estrutura do Projeto

```
yagoimports/
├── app/                      # Rotas Next.js
│   ├── page.tsx             # Página inicial (loja)
│   ├── produto/[id]/        # Página de detalhes do produto
│   ├── carrinho/            # Página do carrinho
│   └── admin/               # Painel administrativo
│       ├── login/           # Login admin
│       ├── dashboard/       # Dashboard
│       ├── produtos/        # Gerenciar produtos
│       ├── categorias/      # Gerenciar categorias
│       ├── vendas/          # Gerenciar vendas
│       └── relatorios/      # Relatórios
├── components/              # Componentes React
│   ├── admin/              # Componentes do admin
│   └── ui/                 # Componentes UI reutilizáveis
├── lib/                    # Bibliotecas e utilitários
│   ├── firebase/           # Configuração Firebase
│   ├── context/            # Contexts React
│   └── types.ts            # TypeScript types
└── public/                 # Arquivos estáticos
```

## 📚 Documentação

- **[QUICKSTART.md](./QUICKSTART.md)** - Início rápido em 3 passos
- **[FIREBASE_SETUP.md](./FIREBASE_SETUP.md)** - Guia completo Firebase
- **[ADMIN_PANEL.md](./ADMIN_PANEL.md)** - Documentação do painel
- **[USAGE_EXAMPLES.md](./USAGE_EXAMPLES.md)** - Exemplos de uso
- **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** - Checklist de deploy
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Resumo técnico

## 🎨 Stack Tecnológico

- **Framework**: Next.js 15
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Backend**: Firebase
  - Authentication (autenticação)
  - Firestore (banco de dados)
  - Storage (armazenamento)
- **UI Components**: Radix UI
- **Ícones**: Lucide React
- **State Management**: Zustand + Context API

## 🔐 Acesso ao Painel Admin

### Criar Primeiro Usuário
1. Configure o Firebase (veja [FIREBASE_SETUP.md](./FIREBASE_SETUP.md))
2. No Firebase Console, vá em Authentication
3. Adicione um usuário com email e senha
4. Use essas credenciais para fazer login

### Login
Acesse: `http://localhost:3000/admin/login`

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build
npm run build        # Cria build de produção
npm start            # Inicia servidor de produção

# Qualidade de Código
npm run lint         # Verifica erros de código
```

## 🎯 Próximas Implementações

- [ ] Formulário completo de produtos com upload de imagens
- [ ] Gráficos em tempo real no dashboard
- [ ] Sistema de notificações
- [ ] Múltiplos usuários admin com permissões
- [ ] Exportação de relatórios (PDF/Excel)
- [ ] Integração com gateway de pagamento
- [ ] Sistema de cupons e promoções
- [ ] Chat de suporte

## 🐛 Solução de Problemas

### Erro: "Firebase not configured"
- Verifique se `.env.local` existe e está preenchido
- Reinicie o servidor: `npm run dev`

### Erro ao fazer login
- Confirme que criou o usuário no Firebase Authentication
- Verifique se Email/Password está habilitado

### Produtos não aparecem
- Verifique se há produtos no Firestore
- Confira as regras de segurança do Firestore

## 📞 Suporte & Links

- **Next.js**: [nextjs.org/docs](https://nextjs.org/docs)
- **Firebase**: [firebase.google.com/docs](https://firebase.google.com/docs)
- **Tailwind CSS**: [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **TypeScript**: [typescriptlang.org/docs](https://typescriptlang.org/docs)

## 🌟 Features Destacadas

### Loja
- Design moderno e responsivo
- Performance otimizada (Next.js 15)
- SEO-friendly
- Imagens otimizadas
- Carregamento rápido

### Admin
- Interface intuitiva
- CRUD completo de categorias
- Dashboard com métricas
- Design consistente com a loja
- Totalmente responsivo
- Segurança com Firebase Auth

## 🚀 Deploy

Para fazer deploy do projeto, consulte: **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)**

### Deploy Rápido na Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Não esqueça de configurar as variáveis de ambiente na Vercel!

## 📄 Licença

Este projeto é privado e proprietário.

---

**Desenvolvido com ❤️ para Yago Imports**

Para começar rapidamente, veja: **[QUICKSTART.md](./QUICKSTART.md)**
