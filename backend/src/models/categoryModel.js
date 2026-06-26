import pool from "../../db.js";

// Get all categories
export const getAllCategories = async () => {
  const result = await pool.query(
    "SELECT * FROM categories"
  );

  return result.rows;
};

// Get single category
export const getCategoryById = async (category_id) => {
  const result = await pool.query(
    `
    SELECT * FROM categories 
    WHERE category_id = $1`,
    [category_id]
  );
  return result.rows[0];
};

// Get products by category
export const getProductsByCategoryId = async (category_id) => {
  const result = await pool.query(
    `
    SELECT product_id, name, price, category_id
    FROM products
    WHERE category_id = $1
    `
    [category_id]
  );

  return result.rows;
};