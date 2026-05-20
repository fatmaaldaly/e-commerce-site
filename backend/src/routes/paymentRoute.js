import express from "express";
import pool from "../../db.js"; 
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Allowed payment methods
const VALID_METHODS = ["cash", "paypal", "card"];

// PAYMENTS — PAY ORDER
router.post("/", authMiddleware, async (req, res) => {
  const { order_id, method } = req.body;

  // Validate required fields
  if (!order_id || !method) {
    return res.status(400).json({ error: "Order ID and payment method are required" });
  }

  // Validate payment method
  if (!VALID_METHODS.includes(method)) {
    return res.status(400).json({ error: `Invalid payment method. Allowed: ${VALID_METHODS.join(", ")}` });
  }

  try {
    // Check if order exists
    const orderRes = await pool.query(
      "SELECT total_price FROM orders WHERE order_id = $1",
      [order_id]
    );

    if (orderRes.rows.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    const amount = orderRes.rows[0].total_price;

    // Insert payment
    await pool.query(
      `INSERT INTO payments (order_id, amount, method, status)
       VALUES ($1, $2, $3, 'paid')`,
      [order_id, amount, method]
    );

    // Update order status
    await pool.query(
      `UPDATE orders SET status = 'paid' WHERE order_id = $1`,
      [order_id]
    );

    res.json({ message: "Payment successful" });
  } catch (err) {
    console.error("Payment error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
