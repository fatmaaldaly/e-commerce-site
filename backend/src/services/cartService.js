import { addItemToCart, createCart, getCartItem, 
    getUserCart, removeFromCart, updateCartItemQuantity, getCartItems, 
    clearCart} from "../models/cartModel.js"


export const getCartService = async (cart_id) => {
  
    const cart = await getCartItems(cart_id);
    return cart;
}


export const addToCartService = async (cart_id, product_id, quantity) => {
    // 1) check if item already exists in cart
    const existingItem = await getCartItem(cart_id, product_id);
    if(existingItem){
        // 2) update quantity if item exists in cart
        const updateQuantity = await updateCartItemQuantity(
            existingItem.cart_item_id, 
            existingItem.quantity + quantity
        );
        return updateQuantity;
    }
    // 3) add new item to cart if it doesn't exist
    const newItem = await addItemToCart(cart_id, product_id, quantity);
    return newItem;
}


export const updateCartItemQuantityService = async (cart_id, product_id, quantity) => {
    if (quantity <= 0) {
    throw new Error("Quantity must be greater than 0");
  }
    return await updateCartItemQuantity(cart_id, product_id, quantity);
   
}


export const removeFromCartService = async (cart_id, product_id) => {
   return await removeFromCart(cart_id, product_id);
   
}


export const clearCartService = async (cart_id) => {
    return await clearCart(cart_id);
}


