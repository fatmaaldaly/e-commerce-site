-- Demo data for local development. Run after schema.sql.

INSERT INTO categories (name, image_url) VALUES
  ('Makeup',   'https://gkaszcnxrrkcpyapbqwr.supabase.co/storage/v1/object/public/category-images/makeup.png'),
  ('Skincare', 'https://gkaszcnxrrkcpyapbqwr.supabase.co/storage/v1/object/public/category-images/skincare.png'),
  ('Perfume',  'https://gkaszcnxrrkcpyapbqwr.supabase.co/storage/v1/object/public/category-images/perfume.png'),
  ('Tools',    'https://gkaszcnxrrkcpyapbqwr.supabase.co/storage/v1/object/public/category-images/tools.png');

INSERT INTO products (name, price, stock, category_id, image_url) VALUES
  ('Divine cream', 5.95, 9, 2, 'https://gkaszcnxrrkcpyapbqwr.supabase.co/storage/v1/object/public/product-images/Divine%20cream.webp'),
  ('Plum Peptide Booster 2000s', 6.95, 6, 2, 'https://gkaszcnxrrkcpyapbqwr.supabase.co/storage/v1/object/public/product-images/Plum%20Peptide%20Booster%202000s.webp'),
  ('Blush Brush', 40.00, 9, 4, 'https://gkaszcnxrrkcpyapbqwr.supabase.co/storage/v1/object/public/product-images/Topface-Blush-Brush.webp'),
  ('Libre Berry Crush Women Perfume (90ml)', 12.00, 9, 3, 'https://gkaszcnxrrkcpyapbqwr.supabase.co/storage/v1/object/public/product-images/Libre%20Berry%20Crush.jpg'),
  ('Fit Me Matte & Poreless Foundation', 550.00, 9, 1, 'https://gkaszcnxrrkcpyapbqwr.supabase.co/storage/v1/object/public/product-images/Fit-Me-Foundation-104-Soft.webp'),
  ('Superstay Vinyl Ink Liquid Lipstick', 690.00, 9, 1, 'https://gkaszcnxrrkcpyapbqwr.supabase.co/storage/v1/object/public/product-images/Superstay%20Vinyl%20Ink%20Liquid%20Lipstick.webp');

-- To get an admin account: register normally in the app, then run
--   UPDATE users SET role = 'admin' WHERE email = 'you@example.com';
