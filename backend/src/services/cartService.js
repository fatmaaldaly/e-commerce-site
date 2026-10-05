import { addItemToCart, getCartItems, getCartItem,
    removeFromCart, updateCartItemQuantity, clearCart }
from "../models/cartModel.js";
import { dbGetProductById } from "../models/productModel.js";
import { AppError } from "../utils/appError.js";


// Throws if the product doesn't exist or doesn't have enough stock
// for the requested total quantity.
const ensureProductAvailable = async (product_id, requestedQuantity) => {
    const product = await dbGetProductById(product_id);
    if (!product) {
        throw new AppError("Product not found", 404);
    }
    if (requestedQuantity > product.stock) {
        throw new AppError(`Only ${product.stock} of "${product.name}" left in stock`, 400);
    }
};


export const getCartService = async (cart_id) => {
    return await getCartItems(cart_id);
};


// addItemToCart uses ON CONFLICT DO UPDATE, so it handles both insert and increment atomically.
export const addToCartService = async (cart_id, product_id, quantity) => {
    const existing = await getCartItem(cart_id, product_id);
    await ensureProductAvailable(product_id, (existing?.quantity || 0) + quantity);
    return await addItemToCart(cart_id, product_id, quantity);
};


export const updateCartItemQuantityService = async (cart_id, product_id, quantity) => {
    await ensureProductAvailable(product_id, quantity);
    const updatedItem = await updateCartItemQuantity(cart_id, product_id, quantity);
    if (!updatedItem) {
        throw new AppError("Item not found in cart", 404);
    }
    return updatedItem;
};


export const removeFromCartService = async (cart_id, product_id) => {
    return await removeFromCart(cart_id, product_id);
};


export const clearCartService = async (cart_id) => {
    return await clearCart(cart_id);
};
