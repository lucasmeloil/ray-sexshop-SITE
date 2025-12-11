# 🚀 GUIA COMPLETO - INTEGRAÇÃO BACKEND NETLIFY

## 📋 CHECKLIST DE CONFIGURAÇÃO

### **✅ JÁ ESTÁ PRONTO:**

1. ✅ **Database Schema** (`database_schema.sql`)
2. ✅ **API Backend** (`netlify/functions/api.ts`)
3. ✅ **Frontend API Service** (`services/api.ts`)
4. ✅ **Types TypeScript** (`types.ts`)
5. ✅ **Admin Components** (AdminProductRow, AddProductModal)

### **⏳ PRECISA CONFIGURAR:**

1. ⏳ **Variáveis de Ambiente**
2. ⏳ **Banco de Dados PostgreSQL (Neon)**
3. ⏳ **Netlify CLI**

---

## 🔧 PASSO 1: INSTALAR NETLIFY CLI

```bash
npm install -g netlify-cli
```

**Verificar instalação:**

```bash
netlify --version
```

---

## 🗄️ PASSO 2: CONFIGURAR BANCO DE DADOS

### **2.1. Criar Conta no Neon (PostgreSQL)**

1. Acesse: https://neon.tech
2. Crie uma conta gratuita
3. Crie um novo projeto
4. Copie a **Connection String**

**Exemplo:**

```
postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

### **2.2. Executar Schema**

1. Acesse o **SQL Editor** no Neon
2. Cole o conteúdo de `database_schema.sql`
3. Execute o script
4. Verifique se as tabelas foram criadas

---

## 🔐 PASSO 3: CONFIGURAR VARIÁVEIS DE AMBIENTE

### **3.1. Criar arquivo `.env`**

Na raiz do projeto, crie o arquivo `.env`:

```env
# Database
DATABASE_URL=postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require

# JWT Secret
JWT_SECRET=seu-secret-super-seguro-aqui-mude-em-producao
```

### **3.2. Adicionar ao `.gitignore`**

Verifique se `.env` está no `.gitignore`:

```
.env
.env.local
```

---

## 🚀 PASSO 4: RODAR NETLIFY DEV

### **4.1. Parar servidor atual**

No terminal onde está `npm run dev`:

- Pressione **Ctrl+C**

### **4.2. Iniciar Netlify Dev**

```bash
netlify dev
```

**O que acontece:**

- ✅ Vite roda na porta 3000
- ✅ Netlify Functions rodando
- ✅ Proxy em `localhost:8888`
- ✅ API disponível em `/api`

### **4.3. Acessar aplicação**

```
http://localhost:8888
```

---

## 🧪 PASSO 5: TESTAR FUNCIONALIDADES

### **5.1. Login Admin**

```
Email: lucasmelo@nexus.com
Senha: lucas102030
```

ou

```
Email: ray@sexshop.com.br
Senha: ray123
```

### **5.2. Testar CRUD de Produtos**

1. **Adicionar Produto:**

   - Admin → Produtos → Adicionar
   - Preencher dados
   - Salvar
   - ✅ Deve salvar no banco

2. **Editar Produto:**

   - Clicar em ✏️
   - Modificar dados
   - Salvar
   - ✅ Deve atualizar no banco

3. **Excluir Produto:**

   - Clicar em 🗑️
   - Confirmar
   - ✅ Deve deletar do banco

4. **Ver no Site:**
   - Voltar ao site
   - Ver produto no catálogo
   - ✅ Deve aparecer

### **5.3. Testar Slides (Hero)**

1. Admin → Banners (Home)
2. Editar slide
3. Salvar
4. Ver na home
5. ✅ Deve atualizar

### **5.4. Testar Banners de Páginas**

1. Admin → Páginas
2. Editar banner
3. Salvar
4. Ver na página
5. ✅ Deve atualizar

---

## 📊 ENDPOINTS DA API

### **Produtos:**

- `GET /api/products` - Listar todos
- `POST /api/products` - Criar novo (requer auth)
- `PUT /api/products/:id` - Atualizar (requer auth)
- `DELETE /api/products/:id` - Deletar (requer auth)

### **Slides:**

- `GET /api/slides` - Listar todos
- `POST /api/slides` - Criar novo (requer auth)
- `PUT /api/slides/:id` - Atualizar (requer auth)
- `DELETE /api/slides/:id` - Deletar (requer auth)

### **Banners:**

- `GET /api/banners` - Listar todos
- `PUT /api/banners/:pageId` - Atualizar (requer auth)

### **Auth:**

- `POST /api/login` - Login admin

### **Admins:**

- `GET /api/admins` - Listar (requer auth)
- `POST /api/admins` - Criar (requer auth)
- `PUT /api/admins/:id/password` - Mudar senha (requer auth)

---

## 🔒 SEGURANÇA

### **Autenticação JWT:**

Todas as rotas de escrita (POST, PUT, DELETE) requerem token JWT:

```
Authorization: Bearer <token>
```

O token é obtido no login e armazenado em `sessionStorage`.

---

## 🐛 TROUBLESHOOTING

### **Erro: "Cannot connect to database"**

**Solução:**

1. Verificar `DATABASE_URL` no `.env`
2. Verificar se banco está online
3. Verificar credenciais

### **Erro: "401 Unauthorized"**

**Solução:**

1. Fazer login novamente
2. Verificar se token está no sessionStorage
3. Verificar `JWT_SECRET`

### **Erro: "404 Not Found"**

**Solução:**

1. Verificar se Netlify Dev está rodando
2. Acessar via `localhost:8888` (não 3000)
3. Verificar se rota existe na API

### **Erro: "CORS"**

**Solução:**

1. Usar Netlify Dev (já tem CORS configurado)
2. Não acessar diretamente `localhost:3000`

---

## 📝 COMANDOS ÚTEIS

```bash
# Rodar desenvolvimento
netlify dev

# Build para produção
npm run build

# Preview da build
netlify deploy --prod

# Ver logs
netlify functions:log

# Ver status
netlify status
```

---

## 🎯 PRÓXIMOS PASSOS

1. ✅ Instalar Netlify CLI
2. ✅ Criar banco no Neon
3. ✅ Executar schema
4. ✅ Configurar `.env`
5. ✅ Rodar `netlify dev`
6. ✅ Testar CRUD
7. ✅ Deploy para produção

---

## 🚀 DEPLOY PARA PRODUÇÃO

### **1. Conectar ao Netlify**

```bash
netlify init
```

### **2. Configurar variáveis no Netlify**

No dashboard do Netlify:

- Site Settings → Environment Variables
- Adicionar `DATABASE_URL`
- Adicionar `JWT_SECRET`

### **3. Deploy**

```bash
netlify deploy --prod
```

---

## ✅ TUDO PRONTO!

Agora você tem:

- ✅ Backend completo com Netlify Functions
- ✅ Banco de dados PostgreSQL (Neon)
- ✅ CRUD completo de produtos
- ✅ Autenticação JWT
- ✅ Admin panel funcional
- ✅ Dados persistentes (não localStorage)

**Siga os passos e me avise se tiver alguma dúvida!** 🎉
