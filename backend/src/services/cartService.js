import { addItemToCart, getCartItems, getUserCart,
    removeFromCart, updateCartItemQuantity, clearCart }
from "../models/cartModel.js";
import { AppError } from "../utils/appError.js";


export const getCartService = async (cart_id) => {
    return await getCartItems(cart_id);
};


// addItemToCart uses ON CONFLICT DO UPDATE, so it handles both insert and increment atomically.
export const addToCartService = async (cart_id, product_id, quantity) => {
    return await addItemToCart(cart_id, product_id, quantity);
};


export const updateCartItemQuantityService = async (cart_id, product_id, quantity) => {
    if (quantity <= 0) {
        throw new AppError("Quantity must be greater than 0", 400);
    }
    return await updateCartItemQuantity(cart_id, product_id, quantity);
};


export const removeFromCartService = async (cart_id, product_id) => {
    return await removeFromCart(cart_id, product_id);
};


export const clearCartService = async (cart_id) => {
    return await clearCart(cart_id);
};
