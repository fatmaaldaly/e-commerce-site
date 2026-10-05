import pool from "../db.js";

// category_id is optional: null returns products from every category
export const dbGetAllProducts = async (limit, offset, category_id = null) => {
  const result = await pool.query(
    `
    SELECT p.*, c.name AS category_name
    FROM products p
    LEFT JOIN categories c
    ON p.category_id = c.category_id
    WHERE ($3::int IS NULL OR p.category_id = $3)
    ORDER BY p.product_id
    LIMIT $1 OFFSET $2
    `,
    [limit, offset, category_id],
  );

  return result.rows;
};

export const dbCountProducts = async (category_id = null) => {
  const result = await pool.query(
    "SELECT COUNT(*) FROM products WHERE ($1::int IS NULL OR category_id = $1)",
    [category_id],
  );
  return parseInt(result.rows[0].count);
};

export const dbGetProductById = async (product_id) => {
  const result = await pool.query(
    "SELECT product_id, name, price, stock FROM products WHERE product_id = $1",
    [product_id],
  );
  return result.rows[0] || null;
};
