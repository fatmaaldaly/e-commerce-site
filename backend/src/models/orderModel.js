import pool from "../db.js";
import { AppError } from "../utils/appError.js";

export const createOrder = async (
  client,
  user_id,
  total_price,
  { customer_name, phone_number, shipping_address, payment_method },
) => {
  const result = await client.query(
    `INSERT INTO orders 
     (user_id, total_price, customer_name, phone_number, shipping_address, payment_method)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [
      user_id,
      total_price,
      customer_name,
      phone_number,
      shipping_address,
      payment_method,
    ],
  );

  return result.rows[0];
};

// insert order items
export const createOrderItem = async (
  client,
  order_id,
  product_id,
  quantity,
  price,
) => {
  const result = await client.query(
    `INSERT INTO order_items (order_id, product_id, quantity, price)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
    [order_id, product_id, quantity, price],
  );
  return result.rows[0];
};

// update stock — atomic: only decrements if sufficient stock remains
export const decreaseStock = async (client, product_id, quantity) => {
  const result = await client.query(
    `UPDATE products
        SET stock = stock - $1
        WHERE product_id = $2
          AND stock >= $1
        RETURNING product_id`,
    [quantity, product_id],
  );

  if (result.rowCount === 0) {
    throw new AppError("A product in your cart just sold out, please review your cart", 409);
  }

  return result.rows[0];
};

// orders of one user, newest first, each with its items
export const getOrdersByUser = async (user_id) => {
  const result = await pool.query(
    `SELECT
       o.order_id,
       o.total_price,
       o.created_at,
       o.payment_method,
       o.payment_status,
       o.order_status,
       o.shipping_address,
       COALESCE(
         json_agg(
           json_build_object(
             'product_id', oi.product_id,
             'name', p.name,
             'image_url', p.image_url,
             'quantity', oi.quantity,
             'price', oi.price
           ) ORDER BY oi.order_item_id
         ) FILTER (WHERE oi.order_item_id IS NOT NULL),
         '[]'
       ) AS items
     FROM orders o
     LEFT JOIN order_items oi ON oi.order_id = o.order_id
     LEFT JOIN products p ON p.product_id = oi.product_id
     WHERE o.user_id = $1
     GROUP BY o.order_id
     ORDER BY o.created_at DESC`,
    [user_id],
  );
  return result.rows;
};
