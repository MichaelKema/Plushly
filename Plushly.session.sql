CREATE TABLE IF NOT EXISTS plushies (
    id SERIAL PRIMARY KEY,
    asin TEXT,
    title TEXT,
    price NUMERIC,
    currency TEXT,
    rating NUMERIC,
    url TEXT UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
