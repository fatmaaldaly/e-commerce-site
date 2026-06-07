import express from "express";
import { getAllProducts } from "../controllers/productController.js";

const router = express.Router();

// Get all products (with category name)
router.get("/", getAllProducts);


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
