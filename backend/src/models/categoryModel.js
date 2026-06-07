import pool from "../../db.js";

export const getAllCategories = async () => {
    const result = await pool.query(
        "SELECT * FROM categories"
    )
    return result.rows;

}


export const getCategoryById = async (id) => {
    const result = await pool.query(
        "SELECT * FROM products WHERE category_id = $1",
        [id]
    )
    return result.rows;
}