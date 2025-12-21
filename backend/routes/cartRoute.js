import pool from "../index.js";
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// ADD OR INCREMENT PRODUCT
router.post("/add", authMiddleware, async (req, res) => {
  const { product_id, quantity } = req.body;

  if (!product_id) return res.status(400).json({ error: "product_id required" });

  if (!req.user) return res.json({ items: [], message: "Guest cart handled locally" });


  const user_id = req.user.user_id;

  try {
    let cart = await pool.query(
      `SELECT cart_id FROM cart WHERE user_id = $1`,
      [user_id]
    );

    let cart_id;

    if (cart.rows.length === 0) {
      const newCart = await pool.query(
        `INSERT INTO cart (user_id) VALUES ($1) RETURNING cart_id`,
        [user_id]
      );
      cart_id = newCart.rows[0].cart_id;
    } else {
      cart_id = cart.rows[0].cart_id;
    }

    const item = await pool.query(
      `SELECT cart_item_id FROM cart_items WHERE cart_id = $1 AND product_id = $2`,
      [cart_id, product_id]
    );

    if (item.rows.length > 0) {
      await pool.query(
        `UPDATE cart_items SET quantity = quantity + $1 WHERE cart_item_id = $2`,
        [quantity, item.rows[0].cart_item_id]
      );
    } else {
      await pool.query(
        `INSERT INTO cart_items (cart_id, product_id, quantity)
         VALUES ($1, $2, $3)`,
        [cart_id, product_id, quantity]
      );
    }

    res.json({ message: "Cart updated" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// SET NEW QUANTITY — OVERWRITE
router.post("/update", authMiddleware, async (req, res) => {
  const { product_id, quantity } = req.body;
  if (quantity < 1) return res.status(400).json({ error: "Quantity must be >= 1" });
  // FIX: Defensive check
  if (!req.user || !req.user.user_id) {
    return res.status(401).json({ error: "Authentication required to update cart." });
  }

  const user_id = req.user.user_id;

  try {
    const cart = await pool.query(
      `SELECT cart_id FROM cart WHERE user_id = $1`,
      [user_id]
    );

    if (cart.rows.length === 0) {
      return res.status(400).json({ error: "Cart does not exist" });
    }

    const cart_id = cart.rows[0].cart_id;

    await pool.query(
      `UPDATE cart_items SET quantity = $1 WHERE cart_id = $2 AND product_id = $3`,
      [quantity, cart_id, product_id]
    );

    res.json({ message: "Quantity updated" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET USER CART
router.get("/", authMiddleware, async (req, res) => {
  if (!req.user || !req.user.user_id) {
    // If the middleware failed to provide a user, or if it intentionally set req.user = null 
    // AND this route requires a user, return 401.
    return res.status(401).json({ error: "Authentication required to fetch cart." });
  }
  const user_id = req.user.user_id;

  try {
    const cart = await pool.query(
      `SELECT cart_id FROM cart WHERE user_id = $1`,
      [user_id]
    );

    if (cart.rows.length === 0) {
      return res.json({ items: [] });
    }

    const cart_id = cart.rows[0].cart_id;

    const items = await pool.query(
      `SELECT product_id, quantity FROM cart_items WHERE cart_id = $1`,
      [cart_id]
    );

    res.json({ items: items.rows });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
