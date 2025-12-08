# 🔥 Guia de Configuração do Firebase - Painel Admin

Este guia explica como configurar o Firebase para o painel administrativo da sua loja.

## 📋 Pré-requisitos

- Conta Google
- Node.js instalado
- Projeto Next.js já configurado

---

## 🚀 Passo 1: Criar Projeto no Firebase

### 1.1 Acesse o Firebase Console
1. Vá para [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Faça login com sua conta Google
3. Clique em **"Adicionar projeto"** ou **"Create a project"**

### 1.2 Configure o Projeto
1. **Nome do projeto**: Digite um nome (ex: "yago-imports-loja")
2. Clique em **"Continuar"**
3. **Google Analytics**: Você pode ativar ou desativar (recomendado: ativar)
4. Se ativou Analytics, selecione ou crie uma conta
5. Clique em **"Criar projeto"**
6. Aguarde a criação (pode levar alguns segundos)
7. Clique em **"Continuar"**

---

## 🌐 Passo 2: Registrar seu App Web

### 2.1 Adicionar App Web ao Projeto
1. No painel do Firebase, você verá a mensagem "Comece adicionando o Firebase ao seu app"
2. Clique no ícone **"Web"** (símbolo `</>`)
3. **Apelido do app**: Digite um nome (ex: "Yago Imports Admin")
4. **Firebase Hosting**: Pode deixar desmarcado por enquanto
5. Clique em **"Registrar app"**

### 2.2 Copiar as Chaves de Configuração
Você verá um código JavaScript com suas configurações. Copie apenas os valores:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto-id",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

**GUARDE ESSAS INFORMAÇÕES!** Você vai precisar delas no próximo passo.

---

## ⚙️ Passo 3: Configurar Variáveis de Ambiente

### 3.1 Criar arquivo .env.local
1. Na raiz do projeto, crie um arquivo chamado `.env.local`
2. Copie o conteúdo do arquivo `.env.local.example` para o novo arquivo
3. Substitua os valores pelas suas chaves do Firebase:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu-projeto-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu-projeto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

⚠️ **IMPORTANTE**: 
- Nunca commite o arquivo `.env.local` no Git
- Certifique-se que `.env.local` está no arquivo `.gitignore`
- Mantenha suas chaves em segurança

---

## 🔐 Passo 4: Configurar Authentication (Autenticação)

### 4.1 Ativar Email/Password
1. No menu lateral do Firebase Console, clique em **"Authentication"** (ou "Autenticação")
2. Clique em **"Get started"** ou **"Começar"**
3. Vá na aba **"Sign-in method"** (ou "Método de login")
4. Clique em **"Email/Password"**
5. Ative o toggle **"Email/Password"** (primeira opção)
6. Clique em **"Salvar"** ou **"Save"**

### 4.2 Criar Usuário Administrador
1. Vá na aba **"Users"** (ou "Usuários")
2. Clique em **"Add user"** (ou "Adicionar usuário")
3. **Email**: Digite seu email (ex: admin@yagoimports.com)
4. **Password**: Crie uma senha forte (mínimo 6 caracteres)
5. Clique em **"Add user"** (ou "Adicionar usuário")

✅ Pronto! Este será seu login para acessar o painel admin.

---

## 📊 Passo 5: Configurar Firestore Database

### 5.1 Criar Database
1. No menu lateral, clique em **"Firestore Database"**
2. Clique em **"Create database"** (ou "Criar banco de dados")
3. **Modo de segurança**: Selecione **"Start in production mode"** (modo produção)
4. Clique em **"Next"** ou **"Avançar"**
5. **Local**: Selecione um local próximo (ex: "southamerica-east1" para São Paulo)
6. Clique em **"Enable"** ou **"Ativar"**
7. Aguarde a criação do banco de dados

### 5.2 Configurar Regras de Segurança
1. Vá na aba **"Rules"** (ou "Regras")
2. Substitua o conteúdo pelas seguintes regras:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir leitura pública de produtos
    match /produtos/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Permitir leitura pública de categorias
    match /categorias/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Apenas usuários autenticados podem gerenciar vendas
    match /vendas/{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

3. Clique em **"Publish"** (ou "Publicar")

### 5.3 Criar Coleções
Não precisa criar as coleções manualmente. Elas serão criadas automaticamente quando você adicionar o primeiro documento através do painel admin.

As coleções que serão criadas:
- `produtos` - Para armazenar produtos
- `categorias` - Para armazenar categorias
- `vendas` - Para armazenar vendas

---

## 📁 Passo 6: Configurar Storage

### 6.1 Ativar Storage
1. No menu lateral, clique em **"Storage"**
2. Clique em **"Get started"** (ou "Começar")
3. Mantenha as regras padrão e clique em **"Next"**
4. Selecione o mesmo local do Firestore
5. Clique em **"Done"** (ou "Concluído")

### 6.2 Configurar Regras de Segurança do Storage
1. Vá na aba **"Rules"** (ou "Regras")
2. Substitua o conteúdo por:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /produtos/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

3. Clique em **"Publish"** (ou "Publicar")

---

## 🧪 Passo 7: Testar a Configuração

### 7.1 Iniciar o Servidor de Desenvolvimento
```bash
npm run dev
```

### 7.2 Acessar a Tela de Login
1. Abra o navegador em: `http://localhost:3000/admin/login`
2. Use o email e senha que você criou no Passo 4.2
3. Se tudo estiver correto, você será redirecionado para o dashboard

---

## 🎨 Estrutura do Painel Admin

Após o login, você terá acesso a:

### 📊 Dashboard
- Visão geral das métricas
- Total de vendas, pedidos e produtos
- Gráficos de performance

### 📦 Produtos
- Listar todos os produtos
- Adicionar novos produtos
- Editar produtos existentes
- Excluir produtos
- Upload de imagens

### 🏷️ Categorias
- Gerenciar categorias
- Criar novas categorias
- Editar e excluir categorias
- Ver quantidade de produtos por categoria

### 🛒 Vendas
- Ver todas as vendas
- Filtrar por status (pendente, confirmado, enviado, entregue)
- Ver detalhes de cada venda
- Atualizar status dos pedidos

### 📈 Relatórios
- Análise de vendas por período
- Produtos mais vendidos
- Vendas por categoria
- Ticket médio
- Exportar relatórios

---

## 🔒 Segurança Recomendada

### Boas Práticas:
1. **Nunca compartilhe suas chaves do Firebase**
2. **Use senhas fortes para contas admin**
3. **Ative autenticação de 2 fatores na sua conta Google**
4. **Revise regularmente as regras de segurança**
5. **Monitore o uso através do Firebase Console**

### Regras de Firestore Recomendadas para Produção:
- Leitura pública apenas para produtos e categorias
- Escrita restrita a usuários autenticados
- Vendas visíveis apenas para admins

---

## 🐛 Solução de Problemas

### Erro: "Firebase not configured"
- Verifique se o arquivo `.env.local` existe
- Confirme que todas as variáveis estão preenchidas
- Reinicie o servidor de desenvolvimento (`npm run dev`)

### Erro: "Auth/user-not-found"
- Verifique se criou o usuário no Authentication
- Confirme email e senha corretos

### Erro: "Permission denied"
- Verifique as regras do Firestore
- Certifique-se que o usuário está autenticado

### Imagens não aparecem
- Verifique as regras do Storage
- Confirme que o bucket está configurado corretamente

---

## 📞 Recursos Adicionais

- [Documentação Firebase](https://firebase.google.com/docs)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Cloud Firestore](https://firebase.google.com/docs/firestore)
- [Firebase Storage](https://firebase.google.com/docs/storage)

---

## ✅ Checklist de Configuração

- [ ] Projeto Firebase criado
- [ ] App Web registrado
- [ ] Arquivo `.env.local` configurado
- [ ] Authentication ativado
- [ ] Usuário admin criado
- [ ] Firestore Database criado
- [ ] Regras de segurança configuradas
- [ ] Storage ativado
- [ ] Teste de login realizado

---

**Parabéns! 🎉** Seu painel admin está pronto para uso!

Se tiver dúvidas, consulte a documentação oficial do Firebase ou entre em contato com o desenvolvedor.
