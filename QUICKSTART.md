# 🎯 Quick Start - Painel Admin

## ⚡ 3 Passos para Começar

### 1️⃣ Configure o Firebase (5-10 minutos)

```bash
# 1. Acesse: https://console.firebase.google.com
# 2. Crie um projeto
# 3. Adicione um app Web
# 4. Copie as configurações
```

### 2️⃣ Configure as Variáveis (2 minutos)

```bash
# 1. Crie o arquivo .env.local na raiz do projeto
# 2. Cole suas chaves do Firebase
```

```env
NEXT_PUBLIC_FIREBASE_API_KEY=sua-chave-aqui
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu-projeto-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=seu-app-id
```

### 3️⃣ Crie seu Usuário Admin (2 minutos)

```bash
# No Firebase Console:
# 1. Vá em Authentication
# 2. Clique em "Get Started"
# 3. Ative Email/Password
# 4. Adicione um usuário
```

---

## 🚀 Iniciar o Painel

```bash
npm run dev
```

Acesse: **http://localhost:3000/admin/login**

---

## 📚 Documentação Completa

- **[FIREBASE_SETUP.md](./FIREBASE_SETUP.md)** - Guia detalhado passo a passo
- **[ADMIN_PANEL.md](./ADMIN_PANEL.md)** - Documentação do painel
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Resumo técnico

---

## 🎨 Telas Disponíveis

| Rota | Descrição |
|------|-----------|
| `/admin/login` | 🔐 Tela de login |
| `/admin/dashboard` | 📊 Dashboard com métricas |
| `/admin/produtos` | 📦 Gerenciar produtos |
| `/admin/categorias` | 🏷️ Gerenciar categorias |
| `/admin/vendas` | 🛒 Gerenciar vendas |
| `/admin/relatorios` | 📈 Relatórios e análises |

---

## ✅ Checklist Rápido

```
[ ] Firebase configurado
[ ] .env.local criado
[ ] Usuário admin criado
[ ] npm run dev executado
[ ] Login testado
[ ] Painel funcionando
```

---

## 🆘 Precisa de Ajuda?

- **Firebase não configurado?** → Veja [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)
- **Erro ao fazer login?** → Verifique se criou o usuário no Firebase
- **Variáveis de ambiente?** → Confira o arquivo `.env.local.example`

---

**Tudo pronto! 🎉 Comece a usar seu painel admin agora!**
