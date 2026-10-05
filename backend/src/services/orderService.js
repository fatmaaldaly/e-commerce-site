import pool from '../../db.js';
import { createOrder, createOrderItem, decreaseStock } from '../models/orderModel.js';
import { getCartItemsTx, clearCartTx } from '../models/cartModel.js';
import { AppError } from '../utils/appError.js';


export const checkoutService = async (user_id, cart_id,
  { customer_name, phone_number, shipping_address, payment_method }) => {

    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      // Read cart items inside the transaction with a row-level lock on products.
      // This prevents concurrent orders from overselling the same item.
      const cartItems = await getCartItemsTx(client, cart_id);

      if (!cartItems || cartItems.length === 0) {
        throw new AppError('Cart is empty', 400);
      }

      // Validate stock and calculate total
      let total = 0;
      for (const item of cartItems) {
        if (item.stock < item.quantity) {
          throw new AppError(`Insufficient stock for "${item.name}"`, 400);
        }
        total += item.price * item.quantity;
      }

      const order = await createOrder(client, user_id, total, {
        customer_name,
        phone_number,
        shipping_address,
        payment_method,
      });

      for (const item of cartItems) {
        await createOrderItem(client, order.order_id, item.product_id, item.quantity, item.price);
        // decreaseStock throws if stock was taken by a concurrent order between our lock and update
        await decreaseStock(client, item.product_id, item.quantity);
      }

      await clearCartTx(client, cart_id);
      await client.query('COMMIT');

      return {
        message: 'Order created successfully',
        order_id: order.order_id,
        total_price: total,
      };

    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
};
