import express from "express";
import pool from "../index.js";

const router = express.Router();

// Get all products (with category name)
router.get("/", async (req, res) => {
  try {
    //pagination
    //page number, defsult is 1
    const page = parseInt(req.query.page) || 1;
    //items per page
    const limit = parseInt(req.query.limit) || 10;
    // how many rows to skip
    const offset = (page - 1) * limit;

    // Get total count
    const countResult = await pool.query(
      "SELECT COUNT(*) FROM products"
    );
    const totalProducts = parseInt(countResult.rows[0].count);

    // get paginated products 
    const result = await pool.query(`
      SELECT p.*, c.name AS category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.category_id
      LIMIT $1 OFFSET $2
    `, [limit, offset]);


    // Response
    res.json({
      total: totalProducts,
      page,
      limit,
      totalPages: Math.ceil(totalProducts / limit),
      data: result.rows,
    });

  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Error fetching products" });
  }
});


// Get a single product by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await pool.query(
//       "SELECT * FROM products WHERE product_id = $1",
//       [id]
//     );
//     if (result.rows.length === 0)
//       return res.status(404).json({ message: "Product not found" });
//     res.json(result.rows[0]);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Error fetching product" });
//   }
// });

export default router;
