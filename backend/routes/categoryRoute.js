import express from "express";
import pool from "../index.js";

const router = express.Router();

// Get all categories
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM categories");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ message: "Error fetching categories" });
  }
});

// Get products in a specific category
router.get("/:id/products", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM products WHERE category_id = $1",
      [id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching products by category:", err);
    res.status(500).json({ message: "Error fetching products by category" });
  }
});

export default router;
