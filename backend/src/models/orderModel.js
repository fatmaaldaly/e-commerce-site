import pool from "../db.js";

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
    throw new Error(`Insufficient stock for product_id ${product_id}`);
  }

  return result.rows[0];
};
