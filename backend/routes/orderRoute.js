import express from "express";
import pool from "../index.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// ORDERS — CREATE ORDER
router.post("/", authMiddleware, async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "You must log in to create an order" });
  }

  const user_id = req.user.user_id;

  try {
    // 1) Get the user's cart
    const cartRes = await pool.query(
      "SELECT cart_id FROM cart WHERE user_id = $1",
      [user_id]
    );

    let cart_id;
    if (cartRes.rows.length === 0) {
      // If user has no cart, create one
      const newCart = await pool.query(
        "INSERT INTO cart (user_id) VALUES ($1) RETURNING cart_id",
        [user_id]
      );
      cart_id = newCart.rows[0].cart_id;
    } else {
      cart_id = cartRes.rows[0].cart_id;
    }

    // 2) Check if the cart has items
    const totalRes = await pool.query(
      `
      SELECT SUM(p.price * ci.quantity) AS total_price
      FROM cart_items ci
      JOIN products p ON p.product_id = ci.product_id
      WHERE ci.cart_id = $1
      `,
      [cart_id]
    );

    const total_price = totalRes.rows[0].total_price;

    if (!total_price || total_price <= 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    // 3) Create order
    const orderRes = await pool.query(
      `
      INSERT INTO orders (user_id, total_price, status)
      VALUES ($1, $2, 'pending')
      RETURNING order_id
      `,
      [user_id, total_price]
    );

    const order_id = orderRes.rows[0].order_id;

    // 4) Move cart items to order_items
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

    // 5) Clear cart items
    await pool.query("DELETE FROM cart_items WHERE cart_id = $1", [cart_id]);

    res.json({ message: "Order created successfully", order_id });
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
