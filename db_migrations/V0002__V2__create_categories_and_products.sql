CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(50) UNIQUE NOT NULL,
    label VARCHAR(100) NOT NULL,
    sort_order INTEGER DEFAULT 0
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category_slug VARCHAR(50) REFERENCES categories(slug),
    price INTEGER NOT NULL,
    old_price INTEGER,
    weight VARCHAR(50),
    description TEXT,
    image_url TEXT,
    badge VARCHAR(50),
    ingredients TEXT,
    allergens TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO categories (slug, label, sort_order) VALUES
    ('cakes',    'Торты',    1),
    ('pastries', 'Пирожные', 2),
    ('macarons', 'Макаруны', 3),
    ('sets',     'Наборы',   4);