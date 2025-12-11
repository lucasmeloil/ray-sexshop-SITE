-- RAY SEX SHOP - DATABASE SCHEMA
-- PostgreSQL Neon (Netlify)

-- 1. TABELA DE PRODUTOS
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    sku VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(100) NOT NULL,
    price VARCHAR(50) NOT NULL,
    original_price VARCHAR(50),
    image_url TEXT NOT NULL,
    images TEXT[],
    description TEXT,
    short_description TEXT,
    is_promotion BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. TABELA DE ADMINISTRADORES
CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. TABELA DE SLIDES
CREATE TABLE IF NOT EXISTS slides (
    id SERIAL PRIMARY KEY,
    image_url TEXT NOT NULL,
    title VARCHAR(255) NOT NULL,
    subtitle TEXT,
    button_text VARCHAR(100) DEFAULT 'Ver Mais',
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. TABELA DE BANNERS DE PAGINAS
CREATE TABLE IF NOT EXISTS page_banners (
    page_id VARCHAR(50) PRIMARY KEY,
    image_url TEXT NOT NULL,
    title VARCHAR(255) NOT NULL,
    subtitle TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- DADOS INICIAIS

-- Admin padrao
INSERT INTO admins (email, password) 
VALUES ('lucasmelo@nexus.com', 'lucas102030')
ON CONFLICT (email) DO NOTHING;

-- Slides iniciais
INSERT INTO slides (image_url, title, subtitle, button_text, display_order) VALUES
('https://image2url.com/images/1761343426235-89f30e35-bc5c-4d5d-b852-460f4e058853.png', 'Explore Seus Desejos', 'A fronteira final do prazer. Descubra uma nova dimensao de sensacoes.', 'Ver Colecao', 1),
('https://images.unsplash.com/photo-1596451190630-186aff535bf2?q=80&w=2070&auto=format&fit=crop', 'Lingeries Exclusivas', 'Sinta-se poderosa com nossa linha de pecas intimas de luxo.', 'Comprar Agora', 2),
('https://images.unsplash.com/photo-1620331309628-842c2d43e57f?q=80&w=2072&auto=format&fit=crop', 'Kits para Casais', 'Reacenda a chama com nossos kits preparados para noites inesqueciveis.', 'Ver Kits', 3)
ON CONFLICT DO NOTHING;

-- Banners de paginas
INSERT INTO page_banners (page_id, image_url, title, subtitle) VALUES
('catalog', 'https://images.unsplash.com/photo-1507919909716-c8262e491cde?q=80&w=2000&auto=format&fit=crop', 'Encontre o seu Prazer', 'Navegue por nossa selecao curada de produtos intimos de alta qualidade.'),
('contact', 'https://images.unsplash.com/photo-1516726817505-f5ed825624d8?q=80&w=2000&auto=format&fit=crop', 'Fale Conosco', 'Estamos aqui para tirar suas duvidas com total discricao.')
ON CONFLICT (page_id) DO UPDATE SET
    image_url = EXCLUDED.image_url,
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle;

-- Produtos de exemplo
INSERT INTO products (name, sku, category, price, original_price, image_url, images, description, short_description, is_promotion) VALUES
('Vibrador Pulsar', 'RAY-001', 'Vibradores', 'R$ 299,90', 'R$ 349,90', 'https://placehold.co/300x300/dc2626/ffffff?text=Vibrador+Pulsar', ARRAY['https://placehold.co/300x300/dc2626/ffffff?text=Vibrador+Pulsar', 'https://placehold.co/300x300/ef4444/ffffff?text=Foto+2'], 'Vibrador potente com multiplos padroes de pulsacao. Design ergonomico e silicioso.', '15% de desconto no PIX', true),
('Kit Seducao Red', 'RAY-002', 'Kits', 'R$ 199,90', NULL, 'https://placehold.co/300x300/dc2626/ffffff?text=Kit+Seducao', ARRAY['https://placehold.co/300x300/dc2626/ffffff?text=Kit+Seducao'], 'Kit completo para noites inesqueciveis. Inclui venda, algemas e oleo.', 'Em ate 3x sem juros', false),
('Oleo Deslizante', 'RAY-003', 'Lubrificantes', 'R$ 79,90', NULL, 'https://placehold.co/300x300/dc2626/ffffff?text=Oleo', ARRAY['https://placehold.co/300x300/dc2626/ffffff?text=Oleo'], 'Lubrificante a base de agua com efeito duradouro. Hipoalergenico.', 'Compre 2, leve 3', false),
('Algemas de Veludo', 'RAY-004', 'Acessorios', 'R$ 129,90', NULL, 'https://placehold.co/300x300/dc2626/ffffff?text=Algemas', ARRAY['https://placehold.co/300x300/dc2626/ffffff?text=Algemas'], 'Algemas macias e seguras para jogos de dominacao. Ajustaveis.', 'Em ate 3x sem juros', false),
('Lingerie Lace Red', 'RAY-007', 'Lingeries', 'R$ 249,90', 'R$ 299,90', 'https://placehold.co/300x300/dc2626/ffffff?text=Lingerie', ARRAY['https://placehold.co/300x300/dc2626/ffffff?text=Lingerie'], 'Lingerie sensual com detalhes em renda. Tamanhos P ao GG.', 'Ultimas unidades', true)
ON CONFLICT (sku) DO NOTHING;

-- INDICES
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_is_promotion ON products(is_promotion);
CREATE INDEX IF NOT EXISTS idx_slides_display_order ON slides(display_order);

-- TRIGGER PARA UPDATED_AT
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_page_banners_updated_at BEFORE UPDATE ON page_banners
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
