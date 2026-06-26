import pool from '../../db.js';
import { createOrder, createOrderItem, decreaseStock } 
from '../models/orderModel.js';
import { getCartItems, clearCartTx } from '../models/cartModel.js';


export const checkoutService = async (user_id, cart_id,  
  { customer_name, phone_number, shipping_address, payment_method }) => {

    const client = await pool.connect();

    try{
      await client.query('BEGIN');
      // 1) get cart items
      const cartItems = await getCartItems(cart_id);
      if(!cartItems || cartItems.length === 0) {
        throw new Error('Cart is empty');
      }
      let total = 0;
      
      // 2) Validate stock + calculate total
      for( const item of cartItems){
        if(item.stock < item.quantity){
            throw new Error(`Insufficient stock for product ${item.name}`);
        }
        total += item.price * item.quantity;
      }
 
      // 3) create order
      const order = await createOrder(client, user_id, total,
         {  customer_name,
           phone_number,
           shipping_address,
           payment_method }
      );
      
      // 4) create order items + update stock
      for(const item of cartItems){
        await createOrderItem(
        client,
        order.order_id,
        item.product_id,
        item.quantity,
        item.price
       );
        await decreaseStock(
        client, 
        item.product_id, 
        item.quantity
        );
      }

      // 5) clear cart
      await clearCartTx(client, cart_id);
      await client.query("COMMIT");
      return{
        message: "Order created successfully",
        order_id: order.order_id,
        total_price: total
      }

    }catch(error){
        await client.query("ROLLBACK");
        throw error;
    }finally {
        client.release();
    }
}