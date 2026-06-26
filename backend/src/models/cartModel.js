import pool from "../../db.js";


export const getUserCart = async (user_id) => {
    const cart = await pool.query(
        "SELECT cart_id FROM cart WHERE user_id = $1",
        [user_id]
    )
    return cart.rows[0] || null;
}


export const createCart = async (user_id) => {
    const newCart = await pool.query(
        `INSERT INTO cart (user_id) 
         values ($1) RETURNING cart_id`,
        [user_id]
    )
    return newCart.rows[0];
}

// for checking for duplicates
export const getCartItem = async(cart_id, product_id) => {
    const getItem = await pool.query(
        `SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2`,
        [cart_id, product_id]
    )
    return getItem.rows[0] || null;
}


export const addItemToCart = async (cart_id, product_id, quantity) => {
    const addItem = await pool.query(
        `INSERT INTO cart_items (cart_id, product_id, quantity)
         VALUES ($1, $2, $3) 
         ON CONFLICT (cart_id, product_id)
         DO UPDATE
         SET quantity = cart_items.quantity + EXCLUDED.quantity
         RETURNING *`,
         [cart_id, product_id, quantity]
    )
    return addItem.rows[0];
}


export const updateCartItemQuantity = async (cart_id, product_id, quantity) => {
  const result = await pool.query(
    `
    UPDATE cart_items
    SET quantity = $1
    WHERE cart_id = $2
      AND product_id = $3
    RETURNING *
    `,
    [quantity, cart_id, product_id]
  );

  return result.rows[0];
};


// for fetching full cart
export const getCartItems = async (cart_id) => {
    console.log("DB Cart ID:", cart_id);

    const cart = await pool.query(
        `SELECT 
         ci.product_id,
         ci.quantity,
         p.name,
         p.price,
         p.stock,
         p.image_url
         FROM cart_items ci
         JOIN products p ON ci.product_id = p.product_id
         WHERE ci.cart_id = $1
         ORDER BY ci.cart_item_id;`,
         [cart_id]
    );
     
    return cart.rows;
}


export const removeFromCart = async (cart_id, product_id) => {
    const removeItem = await pool.query(
        `DELETE FROM cart_items
         WHERE cart_id = $1 AND product_id = $2
         RETURNING *`,
        [cart_id, product_id]
    );
    return removeItem.rows[0];
}


export const clearCart = async (cart_id) => {
    return  await pool.query(`
        DELETE FROM cart_items
        WHERE cart_id = $1
       `, [cart_id])
}


// for clearing cart within transaction
export const clearCartTx = async (client, cart_id) => {
    return await client.query(
      `
      DELETE FROM cart_items
      WHERE cart_id = $1
      `,
      [cart_id]
    );
};
