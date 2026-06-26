import { createCart, getUserCart } from "../models/cartModel.js";


export const validateCart = async (req, res, next) => {
    /*
    Ensures:
    - The authenticated user has a cart
    - Creates one if it does not exist
    - Attaches cart_id to req.cart_id
  */

    const user_id = req.user.user_id; 
    if(!user_id){
        return res.status(401).json({ error: "unauthorized" });
    }

    try{
      let cart = await getUserCart(user_id);
      if(!cart){
          cart = await createCart(user_id); 
      }
      // const cart_id = req.cart_id;  
      req.cart_id = cart.cart_id;
      console.log("Cart ID:", req.cart_id);
      next();

    }catch(err){
      next(err);
    }

};


export const validateCartInput = (req, res, next) => {

   console.log("Request body:", req.body);
      const { product_id, quantity } = req.body;

      if (!product_id) 
        return res.status(400).json({ error: "product_id required" });
      
      if (quantity !== undefined && (!Number.isInteger(quantity) || quantity <= 0)) {
        return res.status(400).json({
            error: "quantity must be a positive integer",
        });
      }

     next();
};