import pool from "../index.js";
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validateCartInput } from "../middleware/validateCartInputMiddleware.js";
import {getUserCart} from "../middleware/getUserCartMiddleware.js";


const router = express.Router();

// ADD OR INCREMENT PRODUCT
router.post("/add", authMiddleware, validateCartInput, getUserCart, async (req, res) => {
  const { product_id, quantity=1} = req.body;
  const cart_id = req.cart_id;


  try {

    // const item = await pool.query(
    //   `SELECT cart_item_id FROM cart_items WHERE cart_id = $1 AND product_id = $2`,
    //   [cart_id, product_id]
    // );

    // if (item.rows.length > 0) {
    //   await pool.query(
    //     `UPDATE cart_items SET quantity = quantity + $1 WHERE cart_item_id = $2`,
    //     [quantity, item.rows[0].cart_item_id]
    //   );
    // } else {
    //   await pool.query(
    //     `INSERT INTO cart_items (cart_id, product_id, quantity)
    //      VALUES ($1, $2, $3)`,
    //     [cart_id, product_id, quantity]
    //   );
    // }
    await pool.query(
      `
      INSERT INTO cart_items (cart_id, product_id, quantity)
      VALUES ($1, $2, $3)
      ON CONFLICT (cart_id, product_id)
      DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity
      `,
      [cart_id, product_id, quantity]
    );


    res.json({ message: "Cart updated" });

  } catch (err) {
    // res.status(500).json({ error: err.message });
    console.error("ADD TO CART ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});


// SET NEW QUANTITY — OVERWRITE
router.post("/update", authMiddleware, validateCartInput, getUserCart, async (req, res) => {
  const { product_id, quantity=1 } = req.body;
  const cart_id = req.cart_id;
  

  try {

    // REMOVE ITEM
      if (quantity === 0) {
        await pool.query(
          `DELETE FROM cart_items
           WHERE cart_id = $1 AND product_id = $2`,
          [cart_id, product_id]
        );

        return res.json({ message: "Item removed from cart" });
      }
      
    // UPDATE QUANTITY
    const updateCart = await pool.query(
      `UPDATE cart_items SET quantity = $1 WHERE cart_id = $2 AND product_id = $3`,
      [quantity, cart_id, product_id]
    );

    if(updateCart.rowCount === 0){
        return res.status(404).json({ error: "Product not found in cart." });
    }

    res.json({ message: "Quantity updated" });

  } catch (err) {
    // res.status(500).json({ error: err.message });
    console.error("update ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});


// GET USER CART
router.get("/", authMiddleware, getUserCart, async (req, res) => {

  const cart_id = req.cart_id;

  try {
    const items = await pool.query(
      `SELECT product_id, quantity FROM cart_items WHERE cart_id = $1`,
      [cart_id]
    );

    res.json({ items: items.rows });

  } catch (err) {
    // res.status(500).json({ error: err.message });
     console.error("get CART ERROR:", err);
     res.status(500).json({ error: err.message });
  
  }
});


export default router;
