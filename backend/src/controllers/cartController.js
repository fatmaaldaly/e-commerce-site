import { addToCartService, getCartService, 
    updateCartItemQuantityService, removeFromCartService, clearCartService } 
from "../services/cartService.js";


export const getCart = async (req, res, next) => {
    const cart_id = req.cart_id;

    try{
     const cart = await getCartService(cart_id);
     console.log("Cart items:", cart);
     console.log("Controller Cart ID:", cart_id);
     return res.status(200).json({
      items: cart || [],
    });

   
    
    }catch(error){
        next(error);
    }
}


export const addItem = async (req, res, next) => {
    const {product_id, quantity} = req.body;
    const cart_id = req.cart_id;

    try{
      const newItem = await addToCartService(cart_id, product_id, quantity);
      console.log("Inserted item:", newItem);
      res.status(201).json(newItem);  
    
    }catch (error) {
      next(error);
    }
}


export const updateQuantity = async (req, res, next) => {
    const {product_id, quantity} = req.body;
    const cart_id = req.cart_id;

    try{
        const updatedItem = await updateCartItemQuantityService(cart_id, product_id, quantity);
        return res.status(200).json(updatedItem);
    }catch(error){
       next(error);
    }
}


export const removeItem = async (req, res, next) => {
    const { product_id } = req.params;
    const cart_id = req.cart_id;

    try {
        const removedItem = await removeFromCartService(cart_id, product_id);
        if (!removedItem) {
            return res.status(404).json({ error: "Item not found in cart" });
        }
        res.status(200).json(removedItem);
        
    } catch (error) {
        next(error);
    }
}


export const clearCart = async (req, res, next) => {
    const cart_id = req.cart_id;

    try {
        const clearedCart = await clearCartService(cart_id);
        res.status(200).json(clearedCart);
        
    } catch (error) {
        next(error);
    }
}

