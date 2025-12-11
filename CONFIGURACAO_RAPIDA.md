# ⚡ CONFIGURAÇÃO RÁPIDA - BACKEND NETLIFY

## 🚀 INÍCIO RÁPIDO (5 MINUTOS)

### **PASSO 1: Instalar Netlify CLI**

```bash
npm install -g netlify-cli
```

---

### **PASSO 2: Criar Banco de Dados**

1. Acesse: **https://neon.tech**
2. Crie conta gratuita
3. Crie novo projeto
4. Copie a **Connection String**

---

### **PASSO 3: Criar arquivo .env**

Na raiz do projeto, crie o arquivo `.env`:

```env
DATABASE_URL=cole-aqui-a-connection-string-do-neon
JWT_SECRET=qualquer-texto-secreto-aleatorio
```

**Exemplo:**

```env
DATABASE_URL=postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
JWT_SECRET=meu-secret-super-seguro-123456
```

---

### **PASSO 4: Executar Schema no Banco**

1. No Neon, vá em **SQL Editor**
2. Abra o arquivo `database_schema.sql` deste projeto
3. Copie todo o conteúdo
4. Cole no SQL Editor
5. Clique em **Run**
6. Verifique se as tabelas foram criadas

---

### **PASSO 5: Rodar Aplicação**

```bash
# Parar npm run dev (Ctrl+C)

# Rodar Netlify Dev
netlify dev
```

**Acesse:** `http://localhost:8888`

---

## ✅ PRONTO!

Agora você tem:

- ✅ Backend rodando
- ✅ Banco de dados conectado
- ✅ API funcionando
- ✅ Admin panel operacional

---

## 🧪 TESTAR

1. Acesse: `http://localhost:8888`
2. Login Admin:
   - Email: `lucasmelo@nexus.com`
   - Senha: `lucas102030`
3. Adicionar produto
4. Ver no site
5. ✅ Funcionando!

---

## 🐛 PROBLEMAS?

### **Erro: "Cannot connect to database"**

- Verifique o `DATABASE_URL` no `.env`
- Verifique se o banco está online no Neon

### **Erro: "404 Not Found"**

- Certifique-se de acessar `localhost:8888` (não 3000)
- Verifique se `netlify dev` está rodando

### **Erro: "Unauthorized"**

- Faça login novamente
- Verifique o `JWT_SECRET` no `.env`

---

## 📚 MAIS DETALHES

Veja o arquivo `GUIA_BACKEND_NETLIFY.md` para:

- Documentação completa da API
- Troubleshooting avançado
- Deploy para produção
- Configurações adicionais

---

## 🎯 RESUMO DOS COMANDOS

```bash
# 1. Instalar CLI
npm install -g netlify-cli

# 2. Criar .env (manual)
# DATABASE_URL=...
# JWT_SECRET=...

# 3. Rodar
netlify dev

# 4. Acessar
# http://localhost:8888
```

**É ISSO! SIMPLES E RÁPIDO!** 🚀
