# 🖼️ SISTEMA DE MÚLTIPLAS IMAGENS - IMPLEMENTAÇÃO

## 🎯 OBJETIVO

Permitir que cada produto tenha **até 3 fotos** que podem ser:

- Adicionadas no painel admin
- Editadas a qualquer momento
- Visualizadas no carrossel do ProductCard

---

## ✅ JÁ IMPLEMENTADO

### **1. Database Schema** ✅

```sql
CREATE TABLE products (
    ...
    image_url TEXT NOT NULL,      -- Imagem principal
    images TEXT[],                 -- Array de até 3 imagens
    ...
);
```

### **2. TypeScript Types** ✅

```typescript
export interface Product {
    ...
    imageUrl: string;    // Imagem principal
    images?: string[];   // Array de imagens adicionais
    ...
}
```

### **3. ProductCard** ✅

- Já tem carrossel de imagens
- Usa `images` array se disponível
- Fallback para `imageUrl` se não houver

---

## 🔧 O QUE PRECISA SER FEITO

### **ETAPA 1: Atualizar AdminProductRow**

Adicionar campos para 3 imagens:

```typescript
// Estado para as 3 imagens
const [productImages, setProductImages] = useState<string[]>(
    product.images || [product.imageUrl]
);

// Inputs para cada imagem
<div className="space-y-2">
    <label>Imagem 1 (Principal)</label>
    <input
        value={productImages[0] || ''}
        onChange={(e) => updateImage(0, e.target.value)}
    />

    <label>Imagem 2 (Opcional)</label>
    <input
        value={productImages[1] || ''}
        onChange={(e) => updateImage(0, e.target.value)}
    />

    <label>Imagem 3 (Opcional)</label>
    <input
        value={productImages[2] || ''}
        onChange={(e) => updateImage(2, e.target.value)}
    />
</div>

// Preview das imagens
<div className="grid grid-cols-3 gap-2">
    {productImages.map((img, idx) => (
        <img key={idx} src={img} alt={`Preview ${idx + 1}`} />
    ))}
</div>
```

### **ETAPA 2: Atualizar Modal de Adicionar Produto**

No `App.tsx`, modal de adicionar produto:

```typescript
const [newProduct, setNewProduct] = useState({
    ...
    imageUrl: '',
    images: ['', '', '']  // 3 campos de imagem
});

// Inputs no modal
<div>
    <label>Imagem 1 (Principal) *</label>
    <input
        value={newProduct.images[0]}
        onChange={(e) => {
            const imgs = [...newProduct.images];
            imgs[0] = e.target.value;
            setNewProduct({...newProduct, images: imgs, imageUrl: e.target.value});
        }}
    />
</div>

<div>
    <label>Imagem 2 (Opcional)</label>
    <input
        value={newProduct.images[1]}
        onChange={(e) => {
            const imgs = [...newProduct.images];
            imgs[1] = e.target.value;
            setNewProduct({...newProduct, images: imgs});
        }}
    />
</div>

<div>
    <label>Imagem 3 (Opcional)</label>
    <input
        value={newProduct.images[2]}
        onChange={(e) => {
            const imgs = [...newProduct.images];
            imgs[2] = e.target.value;
            setNewProduct({...newProduct, images: imgs});
        }}
    />
</div>
```

### **ETAPA 3: Atualizar API**

No `netlify/functions/api.ts`:

```typescript
// POST /api/products
app.post('/api/products', authenticateToken, async (req, res) => {
    const { name, sku, category, price, originalPrice, imageUrl, images, ... } = req.body;

    // Filtrar imagens vazias
    const validImages = images.filter(img => img && img.trim() !== '');

    const result = await pool.query(
        `INSERT INTO products
         (name, sku, category, price, original_price, image_url, images, ...)
         VALUES ($1, $2, $3, $4, $5, $6, $7, ...)
         RETURNING *`,
        [name, sku, category, price, originalPrice, imageUrl, validImages, ...]
    );
});

// PUT /api/products/:id
app.put('/api/products/:id', authenticateToken, async (req, res) => {
    const { images, ... } = req.body;

    // Filtrar imagens vazias
    const validImages = images.filter(img => img && img.trim() !== '');

    const result = await pool.query(
        `UPDATE products
         SET ..., images = $X, ...
         WHERE id = $Y
         RETURNING *`,
        [..., validImages, ...]
    );
});
```

### **ETAPA 4: Atualizar ProductCard**

Já está pronto! Mas vamos garantir:

```typescript
// ProductCard.tsx
const productImages =
  product.images && product.images.length > 0
    ? product.images
    : [product.imageUrl];

// Carrossel usa productImages
{
  productImages.map((img, idx) => (
    <img key={idx} src={img} alt={`${product.name} - ${idx + 1}`} />
  ));
}
```

---

## 📋 CHECKLIST DE IMPLEMENTAÇÃO

### **Arquivos a Modificar:**

1. ✅ **types.ts** - Já tem `images?: string[]`
2. ✅ **database_schema.sql** - Já tem `images TEXT[]`
3. ⏳ **AdminProductRow.tsx** - Adicionar 3 inputs de imagem
4. ⏳ **App.tsx** - Atualizar modal de adicionar produto
5. ⏳ **netlify/functions/api.ts** - Atualizar POST e PUT
6. ✅ **ProductCard.tsx** - Já usa images array

---

## 🎨 DESIGN DO ADMIN

### **Layout dos Inputs de Imagem:**

```
┌─────────────────────────────────┐
│ IMAGENS DO PRODUTO              │
├─────────────────────────────────┤
│ Imagem 1 (Principal) *          │
│ [___________________________]   │
│ [Preview]                       │
├─────────────────────────────────┤
│ Imagem 2 (Opcional)             │
│ [___________________________]   │
│ [Preview]                       │
├─────────────────────────────────┤
│ Imagem 3 (Opcional)             │
│ [___________________________]   │
│ [Preview]                       │
└─────────────────────────────────┘
```

---

## 🚀 PRÓXIMOS PASSOS

**Quer que eu implemente agora?**

Vou precisar modificar:

1. `components/AdminProductRow.tsx`
2. `App.tsx` (modal de adicionar)
3. `netlify/functions/api.ts`

**Tempo estimado**: 30-40 minutos

**Me confirme para eu começar!** 🎯
