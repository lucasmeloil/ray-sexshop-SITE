# 🚀 GUIA DE CONFIGURAÇÃO - RAY SEX SHOP

## 📋 PASSO A PASSO PARA CONECTAR O BANCO DE DADOS

### **PASSO 1: Criar Banco PostgreSQL Neon no Netlify**

1. Acesse o **Netlify Dashboard**: https://app.netlify.com
2. Selecione seu site **Ray Sex Shop**
3. Vá em **Integrations** → **Add Integration**
4. Procure por **Neon PostgreSQL** e clique em **Add**
5. Siga o wizard de instalação
6. Após a instalação, copie a **DATABASE_URL** que será gerada

### **PASSO 2: Configurar Variáveis de Ambiente**

No Netlify Dashboard:

1. Vá em **Site configuration** → **Environment variables**
2. Adicione as seguintes variáveis:

```
DATABASE_URL = postgresql://user:password@host/database?sslmode=require
JWT_SECRET = seu-segredo-super-secreto-aqui-mude-isso
```

**IMPORTANTE**: Substitua `DATABASE_URL` pelo valor fornecido pelo Neon

### **PASSO 3: Executar o Schema no Banco**

Você tem 3 opções:

#### **Opção A: Via Neon Console (RECOMENDADO)**

1. Acesse https://console.neon.tech
2. Selecione seu projeto
3. Vá em **SQL Editor**
4. Copie e cole TODO o conteúdo de `database_schema.sql`
5. Clique em **Run** para executar

#### **Opção B: Via psql (Terminal)**

```bash
psql "postgresql://user:password@host/database?sslmode=require" -f database_schema.sql
```

#### **Opção C: Via DBeaver/pgAdmin**

1. Conecte-se ao banco usando a DATABASE_URL
2. Abra o arquivo `database_schema.sql`
3. Execute o script

### **PASSO 4: Verificar Instalação**

Execute este SQL para verificar se as tabelas foram criadas:

```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public';
```

Você deve ver:

- ✅ products
- ✅ admins
- ✅ slides
- ✅ page_banners

### **PASSO 5: Testar Conexão Local**

1. Crie o arquivo `.env.local` na raiz do projeto:

```env
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
JWT_SECRET=seu-segredo-super-secreto
```

2. Instale dependências (se ainda não instalou):

```bash
npm install
```

3. Execute o projeto:

```bash
npm run dev
```

4. Teste o login:
   - Email: `lucasmelo@nexus.com`
   - Senha: `lucas102030`

---

## 🔐 CREDENCIAIS PADRÃO

### **Admin**

- **Email**: lucasmelo@nexus.com
- **Senha**: lucas102030

⚠️ **IMPORTANTE**: Altere essa senha após o primeiro login!

---

## 🐛 TROUBLESHOOTING

### **Erro: "Connection refused"**

- ✅ Verifique se DATABASE_URL está correta
- ✅ Confirme que o banco Neon está ativo
- ✅ Verifique se SSL está habilitado

### **Erro: "Table does not exist"**

- ✅ Execute o `database_schema.sql` no banco
- ✅ Verifique se está conectado ao banco correto

### **Erro: "Invalid credentials" no login**

- ✅ Verifique se a tabela `admins` tem dados
- ✅ Execute: `SELECT * FROM admins;`
- ✅ Se vazio, execute novamente o INSERT do schema

### **API retorna dados mockados**

- ✅ Verifique os logs do Netlify Functions
- ✅ Confirme que DATABASE_URL está nas variáveis de ambiente
- ✅ Faça um redeploy após adicionar as variáveis

---

## 📊 PRÓXIMOS PASSOS

Após conectar o banco, você deve:

1. ✅ **Adicionar produtos reais** (substituir placeholders)
2. ✅ **Upload de imagens** (usar Cloudinary ou Supabase Storage)
3. ✅ **Implementar bcrypt** para hash de senhas
4. ✅ **Configurar domínio customizado**
5. ✅ **Adicionar Google Analytics**

---

## 🆘 PRECISA DE AJUDA?

Se encontrar problemas, me avise e eu te ajudo a resolver!

**Checklist de verificação:**

- [ ] Banco Neon criado
- [ ] DATABASE_URL configurada
- [ ] Schema executado
- [ ] Tabelas criadas
- [ ] Login funcionando
- [ ] Produtos carregando do banco
