# 🎯 Painel Admin - Guia Rápido

## 🚀 Como Começar

### 1. Instalar Dependências
As dependências do Firebase já foram instaladas. Se precisar reinstalar:
```bash
npm install
```

### 2. Configurar Firebase
Siga o guia completo em **[FIREBASE_SETUP.md](./FIREBASE_SETUP.md)** para:
- Criar projeto no Firebase
- Configurar autenticação
- Configurar banco de dados
- Obter as chaves de API

### 3. Configurar Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz do projeto com suas chaves do Firebase:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=sua-chave-aqui
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu-projeto-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=seu-app-id
```

### 4. Iniciar o Servidor
```bash
npm run dev
```

### 5. Acessar o Painel
Abra seu navegador em: `http://localhost:3000/admin/login`

---

## 📁 Estrutura do Painel Admin

```
app/admin/
├── login/              # Tela de login
├── dashboard/          # Dashboard principal
├── produtos/           # Gerenciamento de produtos
├── categorias/         # Gerenciamento de categorias
├── vendas/            # Gerenciamento de vendas
└── relatorios/        # Relatórios e análises

components/admin/
├── admin-layout.tsx        # Layout do painel
└── protected-route.tsx     # Proteção de rotas

lib/
├── firebase/
│   └── config.ts          # Configuração Firebase
└── context/
    └── auth-context.tsx   # Contexto de autenticação
```

---

## 🎨 Cores do Painel

O painel usa as mesmas cores do site principal:

- **Primária**: `oklch(0.208 0.042 265.755)` - Roxo escuro
- **Background**: `oklch(0.9382 0.104 96.09)` - Rosa claro
- **Texto**: `oklch(0% 0 100.06)` - Preto
- **Border**: `oklch(0.929 0.013 255.508)` - Cinza claro

---

## 🔑 Funcionalidades Implementadas

### ✅ Autenticação
- Login com email/senha
- Logout
- Proteção de rotas
- Persistência de sessão

### ✅ Dashboard
- Métricas principais (vendas, pedidos, produtos)
- Estatísticas em tempo real
- Design responsivo

### ✅ Produtos
- Listagem de produtos
- Busca de produtos
- Interface para adicionar/editar (placeholder)
- Exclusão de produtos
- Integração com Firestore

### ✅ Categorias
- Listagem de categorias
- Adicionar nova categoria
- Editar categoria existente
- Excluir categoria
- Contador de produtos por categoria

### ✅ Vendas
- Listagem de todas as vendas
- Filtros por status
- Visualização de detalhes
- Status coloridos

### ✅ Relatórios
- Métricas de performance
- Top produtos vendidos
- Análise de crescimento
- Interface para gráficos

---

## 🔐 Segurança

### Regras Implementadas:
1. Rotas protegidas com autenticação
2. Redirecionamento automático para login
3. Validação de sessão
4. Logout seguro

### Regras do Firestore (configurar no Firebase):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /produtos/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /categorias/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /vendas/{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## 📝 Próximos Passos (Implementações Futuras)

### Produtos
- [ ] Formulário completo de adicionar/editar produto
- [ ] Upload de múltiplas imagens
- [ ] Gerenciamento de variantes (cores/tamanhos)
- [ ] Controle de estoque avançado
- [ ] Produtos em destaque

### Vendas
- [ ] Atualizar status do pedido
- [ ] Enviar notificações ao cliente
- [ ] Imprimir pedido
- [ ] Integração com WhatsApp
- [ ] Gestão de entrega

### Relatórios
- [ ] Implementar gráficos reais (Chart.js ou Recharts)
- [ ] Exportar relatórios (PDF/Excel)
- [ ] Filtros por período
- [ ] Análise de conversão
- [ ] Relatório de estoque

### Melhorias
- [ ] Notificações em tempo real
- [ ] Histórico de atividades
- [ ] Múltiplos usuários admin
- [ ] Permissões por função
- [ ] Backup automático
- [ ] Dark mode

---

## 🛠️ Tecnologias Utilizadas

- **Next.js 15** - Framework React
- **Firebase** - Backend as a Service
  - Authentication - Autenticação
  - Firestore - Banco de dados
  - Storage - Armazenamento de arquivos
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Radix UI** - Componentes acessíveis
- **Lucide React** - Ícones

---

## 📚 Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar produção
npm start

# Verificar erros
npm run lint
```

---

## 🐛 Problemas Comuns

### Erro ao fazer login
- Verifique se criou o usuário no Firebase Authentication
- Confirme que as variáveis de ambiente estão corretas
- Verifique o console do navegador para erros

### Dados não aparecem
- Confirme que as regras do Firestore estão configuradas
- Verifique se há dados no Firestore Database
- Cheque o console para erros de permissão

### Imagens não carregam
- Configure o Firebase Storage
- Verifique as regras de segurança do Storage
- Confirme que o bucket está correto

---

## 📞 Suporte

Para dúvidas sobre:
- **Firebase**: [firebase.google.com/docs](https://firebase.google.com/docs)
- **Next.js**: [nextjs.org/docs](https://nextjs.org/docs)
- **Tailwind CSS**: [tailwindcss.com/docs](https://tailwindcss.com/docs)

---

## ✨ Dicas

1. **Mantenha o .env.local seguro** - Nunca commite no Git
2. **Backup regular** - Exporte seus dados do Firestore regularmente
3. **Monitore uso** - Acompanhe o uso no Firebase Console
4. **Teste antes de produção** - Sempre teste mudanças em desenvolvimento

---

**Desenvolvido com ❤️ para Yago Imports**
