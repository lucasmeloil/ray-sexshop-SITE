import express, { Router, Request, Response, NextFunction } from 'express';
import serverless from 'serverless-http';
import { neon } from '@neondatabase/serverless';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

// Database Connection (Neon Serverless)
const sql = neon(process.env.DATABASE_URL!);

// Neon Auth Configuration (JWKS)
const NEON_JWKS_URI = 'https://ep-steep-truth-acuwp9wl.neonauth.sa-east-1.aws.neon.tech/neondb/auth/.well-known/jwks.json';

const client = jwksClient({
  jwksUri: NEON_JWKS_URI,
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5
});

function getKey(header: any, callback: any) {
  client.getSigningKey(header.kid, function(err, key: any) {
    if (err) {
        callback(err);
        return;
    }
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
}

// Initialize Express
const app = express();
const router = Router();

// Middleware
app.use(cors());
app.use(express.json({ limit: '6mb' })); // Aumentado para suportar Base64 (limite do Netlify)
app.use(express.urlencoded({ limit: '6mb', extended: true }));

// --- HELPER FUNCTIONS ---

const handleError = (res: Response, error: any) => {
    console.error('Backend Error:', error);
    // Se o erro for de timeout ou conexão do Neon
    if (error.message?.includes('fetch failed') || error.message?.includes('timeout')) {
        return res.status(503).json({ error: 'Erro de conexão com o Banco de Dados. Tente novamente.' });
    }
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
};

// Middleware to authenticate JWT via Neon Auth
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (token == null) return res.sendStatus(401);

  // Validate token with Neon's Public Key (JWKS)
  jwt.verify(token, getKey, { algorithms: ['RS256'] }, (err: any, user: any) => {
    if (err) {
        console.error("JWT Validation Error:", err.message);
        return res.sendStatus(403);
    }
    (req as any).user = user;
    next();
  });
};

// --- ROUTES ---

// 1. PRODUCTS ROUTES (Public Read, Protected Write)
router.get('/products', async (req, res) => {
    try {
        const rows = await sql`SELECT * FROM products ORDER BY id DESC`;
        const products = rows.map(p => ({
            id: p.id,
            name: p.name,
            sku: p.sku,
            category: p.category,
            price: p.price,
            originalPrice: p.original_price,
            imageUrl: p.image_url,
            images: p.images || [p.image_url],
            description: p.description,
            shortDescription: p.short_description,
            isPromotion: p.is_promotion
        }));
        res.json(products);
    } catch (err) { handleError(res, err); }
});

router.post('/products', authenticateToken, async (req, res) => {
    const { name, sku, category, price, originalPrice, imageUrl, images, description, shortDescription, isPromotion } = req.body;
    try {
        const rows = await sql`
            INSERT INTO products (name, sku, category, price, original_price, image_url, images, description, short_description, is_promotion)
            VALUES (${name}, ${sku}, ${category}, ${price}, ${originalPrice}, ${imageUrl}, ${images}, ${description}, ${shortDescription}, ${isPromotion})
            RETURNING *
        `;
        res.status(201).json(rows[0]);
    } catch (err) { handleError(res, err); }
});

router.put('/products/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { name, sku, category, price, originalPrice, imageUrl, images, description, shortDescription, isPromotion } = req.body;
    try {
        const rows = await sql`
            UPDATE products 
            SET name=${name}, sku=${sku}, category=${category}, price=${price}, original_price=${originalPrice}, image_url=${imageUrl}, images=${images}, description=${description}, short_description=${shortDescription}, is_promotion=${isPromotion}
            WHERE id=${id}
            RETURNING *
        `;
        
        if (rows.length === 0) return res.status(404).json({ error: 'Product not found' });
        
        const p = rows[0];
        res.json({
            id: p.id,
            name: p.name,
            sku: p.sku,
            category: p.category,
            price: p.price,
            originalPrice: p.original_price,
            imageUrl: p.image_url,
            images: p.images,
            description: p.description,
            shortDescription: p.short_description,
            isPromotion: p.is_promotion
        });
    } catch (err) { handleError(res, err); }
});

router.delete('/products/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        await sql`DELETE FROM products WHERE id = ${id}`;
        res.json({ message: 'Product deleted' });
    } catch (err) { handleError(res, err); }
});

// 2. ADMINS ROUTES
router.get('/admins', authenticateToken, async (req, res) => {
    try {
        const rows = await sql`SELECT id, email FROM admins`;
        res.json(rows);
    } catch (err) { handleError(res, err); }
});

router.post('/admins', authenticateToken, async (req, res) => {
    const { email, password } = req.body;
    try {
        const rows = await sql`INSERT INTO admins (email, password) VALUES (${email}, ${password}) RETURNING id, email`;
        res.status(201).json(rows[0]);
    } catch (err) { handleError(res, err); }
});

router.put('/admins/:id/password', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
    try {
        await sql`UPDATE admins SET password = ${password} WHERE id = ${id}`;
        res.json({ message: 'Password updated' });
    } catch (err) { handleError(res, err); }
});

// 3. SLIDES ROUTES (Public Read, Protected Write)
router.get('/slides', async (req, res) => {
    try {
        const rows = await sql`SELECT * FROM slides ORDER BY id ASC`;
        const slides = rows.map(s => ({
            id: s.id,
            imageUrl: s.image_url,
            title: s.title,
            subtitle: s.subtitle,
            buttonText: s.button_text
        }));
        res.json(slides);
    } catch (err) { handleError(res, err); }
});

router.post('/slides', authenticateToken, async (req, res) => {
    const { imageUrl, title, subtitle, buttonText } = req.body;
    try {
        const rows = await sql`INSERT INTO slides (image_url, title, subtitle, button_text) VALUES (${imageUrl}, ${title}, ${subtitle}, ${buttonText}) RETURNING *`;
        const s = rows[0];
        res.status(201).json({
            id: s.id,
            imageUrl: s.image_url,
            title: s.title,
            subtitle: s.subtitle,
            buttonText: s.button_text
        });
    } catch (err) { handleError(res, err); }
});

router.put('/slides/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { imageUrl, title, subtitle, buttonText } = req.body;
    try {
        const rows = await sql`UPDATE slides SET image_url=${imageUrl}, title=${title}, subtitle=${subtitle}, button_text=${buttonText} WHERE id=${id} RETURNING *`;
        const s = rows[0];
        res.json({
            id: s.id,
            imageUrl: s.image_url,
            title: s.title,
            subtitle: s.subtitle,
            buttonText: s.button_text
        });
    } catch (err) { handleError(res, err); }
});

router.delete('/slides/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        await sql`DELETE FROM slides WHERE id = ${id}`;
        res.json({ message: 'Slide deleted' });
    } catch (err) { handleError(res, err); }
});

// 4. PAGE BANNERS ROUTES (Public Read, Protected Write)
router.get('/page-banners', async (req, res) => {
    try {
        const rows = await sql`SELECT * FROM page_banners`;
        const banners = rows.map(b => ({
            pageId: b.page_id,
            imageUrl: b.image_url,
            title: b.title,
            subtitle: b.subtitle
        }));
        res.json(banners);
    } catch (err) { handleError(res, err); }
});

router.put('/page-banners', authenticateToken, async (req, res) => {
    const { pageId, imageUrl, title, subtitle } = req.body;
    try {
        const rows = await sql`
            INSERT INTO page_banners (page_id, image_url, title, subtitle)
            VALUES (${pageId}, ${imageUrl}, ${title}, ${subtitle})
            ON CONFLICT (page_id) 
            DO UPDATE SET image_url = EXCLUDED.image_url, title = EXCLUDED.title, subtitle = EXCLUDED.subtitle
            RETURNING *
        `;
        
        const b = rows[0];
        res.json({
            pageId: b.page_id,
            imageUrl: b.image_url,
            title: b.title,
            subtitle: b.subtitle
        });
    } catch (err) { handleError(res, err); }
});

app.use('/api', router);

export const handler = serverless(app);
