# 🚀 Checklist de Deploy - Painel Admin

## ✅ Antes do Deploy

### 1. Configuração Firebase
- [ ] Projeto Firebase criado
- [ ] Authentication configurado (Email/Password ativado)
- [ ] Firestore Database criado
- [ ] Storage configurado
- [ ] Regras de segurança implementadas
- [ ] Pelo menos 1 usuário admin criado

### 2. Variáveis de Ambiente
- [ ] Arquivo `.env.local` configurado localmente
- [ ] Variáveis testadas localmente
- [ ] `.env.local` NÃO está no Git (verificar .gitignore)
- [ ] Backup das variáveis em local seguro

### 3. Testes Locais
- [ ] Login funciona corretamente
- [ ] Logout funciona
- [ ] Dashboard carrega
- [ ] Produtos: listagem funciona
- [ ] Categorias: CRUD completo funciona
- [ ] Vendas: visualização funciona
- [ ] Relatórios carregam
- [ ] Navegação entre páginas OK
- [ ] Responsivo testado (mobile/tablet/desktop)

### 4. Código
- [ ] `npm run build` executa sem erros
- [ ] TypeScript sem erros críticos
- [ ] Componentes funcionando
- [ ] Imagens otimizadas
- [ ] Console sem erros críticos

---

## 🌐 Deploy na Vercel

### Passo 1: Preparar o Projeto
```bash
# Certifique-se que está na pasta correta
cd /Users/yagostn/Documents/Meus\ Projetos/yagoimports/yagoimports

# Teste o build
npm run build

# Se houver erros, corrija antes de continuar
```

### Passo 2: Criar Repositório Git (se ainda não existe)
```bash
# Inicializar Git
git init

# Adicionar arquivos
git add .

# Commit
git commit -m "Initial commit - Admin Panel"

# Criar repositório no GitHub
# Vá em: https://github.com/new
# Crie um repositório (ex: yagoimports-admin)

# Conectar ao GitHub
git remote add origin https://github.com/SEU_USUARIO/yagoimports-admin.git
git branch -M main
git push -u origin main
```

### Passo 3: Deploy na Vercel
1. Acesse: https://vercel.com
2. Faça login com GitHub
3. Clique em "Add New" > "Project"
4. Importe o repositório do GitHub
5. Configure as variáveis de ambiente:

```
NEXT_PUBLIC_FIREBASE_API_KEY=sua-chave
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu-projeto-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=seu-app-id
```

6. Clique em "Deploy"
7. Aguarde o deploy (2-5 minutos)

### Passo 4: Configurar Domínio (Opcional)
1. Na Vercel, vá em "Settings" > "Domains"
2. Adicione seu domínio personalizado
3. Configure os DNS conforme instruções da Vercel

---

## 🔒 Pós-Deploy - Segurança

### 1. Configurar Domínio Autorizado no Firebase
1. Acesse Firebase Console
2. Vá em Authentication > Settings
3. Em "Authorized domains", adicione:
   - Seu domínio da Vercel (ex: seu-app.vercel.app)
   - Seu domínio personalizado (se houver)

### 2. Atualizar Regras do Firestore
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Produtos: leitura pública, escrita apenas autenticados
    match /produtos/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Categorias: leitura pública, escrita apenas autenticados
    match /categorias/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Vendas: apenas usuários autenticados
    match /vendas/{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 3. Configurar Storage Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /produtos/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null 
                   && request.resource.size < 5 * 1024 * 1024 // 5MB max
                   && request.resource.contentType.matches('image/.*');
    }
  }
}
```

---

## 🧪 Testes Pós-Deploy

### Checklist de Testes
- [ ] Acessar URL do deploy
- [ ] Login funciona
- [ ] Dashboard carrega dados
- [ ] Adicionar categoria
- [ ] Editar categoria
- [ ] Excluir categoria
- [ ] Produtos são listados
- [ ] Vendas são exibidas
- [ ] Relatórios carregam
- [ ] Logout funciona
- [ ] Testar em mobile
- [ ] Testar em diferentes navegadores

### Teste de Performance
```bash
# Google PageSpeed Insights
https://pagespeed.web.dev/

# GTmetrix
https://gtmetrix.com/

# Lighthouse (Chrome DevTools)
F12 > Lighthouse > Generate Report
```

---

## 📊 Monitoramento

### Firebase Console
- [ ] Configurar alertas de uso
- [ ] Monitorar Authentication
- [ ] Verificar uso do Firestore
- [ ] Acompanhar Storage

### Vercel Dashboard
- [ ] Configurar notificações de deploy
- [ ] Monitorar analytics
- [ ] Verificar logs de erro
- [ ] Acompanhar uso de banda

---

## 🔄 Atualizações Futuras

### Processo de Atualização
```bash
# 1. Fazer mudanças localmente
# 2. Testar
npm run dev

# 3. Build local
npm run build

# 4. Commit
git add .
git commit -m "Descrição da mudança"
git push

# 5. Vercel faz deploy automático!
```

---

## 🆘 Troubleshooting Pós-Deploy

### Erro: "Firebase not configured"
- Verifique variáveis de ambiente na Vercel
- Certifique-se que todas têm o prefixo `NEXT_PUBLIC_`
- Redeploy após adicionar variáveis

### Erro: "Authentication failed"
- Verifique domínio autorizado no Firebase
- Confirme que usuário existe no Authentication
- Verifique regras do Firestore

### Erro: "Permission denied"
- Revise regras de segurança do Firestore
- Certifique-se que usuário está autenticado
- Verifique console do navegador para detalhes

### Erro: "Image optimization failed"
- Verifique domínios em `next.config.ts`
- Confirme que Firebase Storage está configurado
- Teste URLs das imagens manualmente

### Deploy falha na Build
- Verifique erros de TypeScript
- Confirme todas as dependências instaladas
- Revise logs do deploy na Vercel

---

## 📱 Configuração de PWA (Opcional)

### Adicionar PWA
```bash
npm install next-pwa
```

### Configurar manifest.json
```json
{
  "name": "Yago Imports Admin",
  "short_name": "Admin",
  "description": "Painel Administrativo",
  "start_url": "/admin/login",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#5B21B6",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

---

## 🎉 Deploy Completo!

### URLs Importantes
- **Site Admin**: https://seu-app.vercel.app/admin
- **Firebase Console**: https://console.firebase.google.com
- **Vercel Dashboard**: https://vercel.com/dashboard

### Próximos Passos
1. Adicionar produtos através do painel
2. Criar categorias
3. Monitorar uso
4. Coletar feedback
5. Implementar melhorias

---

## 📞 Suporte

### Documentação
- [Vercel Docs](https://vercel.com/docs)
- [Firebase Docs](https://firebase.google.com/docs)
- [Next.js Docs](https://nextjs.org/docs)

### Comunidade
- [Vercel Discord](https://vercel.com/discord)
- [Firebase Community](https://firebase.google.com/community)
- [Stack Overflow](https://stackoverflow.com)

---

**Parabéns pelo deploy! 🚀🎉**

Seu painel admin está no ar e pronto para uso!
