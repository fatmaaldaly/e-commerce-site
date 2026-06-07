import pool from "../../db.js";


export const getAllProducts = async (limit, offset) => {
    const result = await pool.query(
    `
    SELECT p.*, c.name AS category_name
    FROM products p
    LEFT JOIN categories c
    ON p.category_id = c.category_id
    LIMIT $1 OFFSET $2
    `,
    [limit, offset]
   );

   return result.rows;
};


export const countProducts = async () => {
    const result = await pool.query(
        "SELECT COUNT(*) FROM products"
    );
    return parseInt(result.rows[0].count);
}

