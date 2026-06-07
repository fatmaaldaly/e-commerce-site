import express from "express";
import pool from "../../db.js"; 
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validateOrder} from "../middlewares/validateOrderMiddleware.js";

const router = express.Router();

// ORDERS — CREATE ORDER
router.post("/", authMiddleware, validateOrder, async (req, res) => {

  const user_id = req.user.user_id;
  const cart_id = req.cart_id;

  try {

    // 1) Calculate total price
    const totalRes = await pool.query(
      "SELECT SUM(price * quantity) AS total_price FROM cart_items WHERE cart_ID = $1",
      [cart_id]);

    const total_price = totalRes.rows[0].total_price;


    // 2) Create order
    const orderRes = await pool.query(
      `
      INSERT INTO orders (user_id, total_price, status)
      VALUES ($1, $2, 'pending')
      RETURNING order_id
      `,
      [user_id, total_price]
    );

    const order_id = orderRes.rows[0].order_id;


    // 3) Move cart items to order_items
    await pool.query(
      `
      INSERT INTO order_items (order_id, product_id, quantity, price)
      SELECT $1, ci.product_id, ci.quantity, p.price
      FROM cart_items ci
      JOIN products p ON p.product_id = ci.product_id
      WHERE ci.cart_id = $2
      `,
      [order_id, cart_id]
    );

    // 4) Clear cart items
    await pool.query("DELETE FROM cart_items WHERE cart_id = $1", [cart_id]);
    res.json({ message: "Order created successfully", order_id });


  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
