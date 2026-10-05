-- Database schema for the e-commerce app (PostgreSQL).
-- Mirrors the tables the backend uses. Run on an EMPTY database:
--   psql -d <your_db> -f database/schema.sql
--   psql -d <your_db> -f database/seed.sql

CREATE TYPE order_status_enum AS ENUM
  ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled', 'returned', 'failed');

CREATE TABLE users (
  user_id       SERIAL PRIMARY KEY,
  full_name     VARCHAR NOT NULL,
  email         VARCHAR NOT NULL UNIQUE,
  password      VARCHAR,                       -- bcrypt hash; NULL for Google accounts
  role          VARCHAR DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  auth_provider VARCHAR DEFAULT 'local',
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
  category_id SERIAL PRIMARY KEY,
  name        VARCHAR NOT NULL,
  image_url   VARCHAR
);

CREATE TABLE products (
  product_id  SERIAL PRIMARY KEY,
  name        VARCHAR NOT NULL,
  price       NUMERIC NOT NULL CHECK (price >= 0),
  stock       INTEGER DEFAULT 0 CHECK (stock >= 0),
  image_url   VARCHAR,
  category_id INTEGER REFERENCES categories(category_id),
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cart (
  cart_id    SERIAL PRIMARY KEY,
  user_id    INTEGER NOT NULL UNIQUE REFERENCES users(user_id),  -- one cart per user
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cart_items (
  cart_item_id SERIAL PRIMARY KEY,
  cart_id      INTEGER NOT NULL REFERENCES cart(cart_id) ON DELETE CASCADE,
  product_id   INTEGER NOT NULL REFERENCES products(product_id),
  quantity     INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  UNIQUE (cart_id, product_id)
);

CREATE TABLE orders (
  order_id         SERIAL PRIMARY KEY,
  user_id          INTEGER NOT NULL REFERENCES users(user_id),
  total_price      NUMERIC NOT NULL,
  customer_name    VARCHAR,
  phone_number     VARCHAR,
  shipping_address TEXT,
  notes            TEXT,
  payment_method   VARCHAR,
  payment_status   VARCHAR DEFAULT 'pending',
  order_status     order_status_enum DEFAULT 'pending',
  created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
  order_item_id SERIAL PRIMARY KEY,
  order_id      INTEGER NOT NULL REFERENCES orders(order_id) ON DELETE CASCADE,
  product_id    INTEGER NOT NULL REFERENCES products(product_id),
  quantity      INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  price         NUMERIC NOT NULL               -- price at the time of purchase
);
