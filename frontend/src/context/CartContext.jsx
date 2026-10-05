import { createContext, useState, useEffect, useCallback } from "react";
import {
  getCartRequest,
  addToCartRequest,
  updateQuantityRequest,
  removeFromCartRequest,
  clearCartRequest,
} from "../services/cartService";
import { useAuth } from "../hooks/useAuth";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState([]);
  const [cartError, setCartError] = useState(null);

  const fetchCart = useCallback(async () => {
    if (!isAuthenticated) {
      setCart([]);
      return;
    }
    try {
      const data = await getCartRequest();
      setCart(data.items || []);
    } catch {
      // silently tolerate; 401 is handled by the api interceptor
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);


  const addToCart = async (product) => {
    if (!isAuthenticated) {
      window.location.href = "/login";
      return;
    }
    try {
      setCartError(null);
      await addToCartRequest(product.product_id);
      await fetchCart();
    } catch (err) {
      setCartError(err?.response?.data?.message || "Failed to add item to cart");
    }
  };


  const updateQuantity = async (product_id, quantity) => {
    if (quantity <= 0) return removeFromCart(product_id);
    try {
      setCartError(null);
      await updateQuantityRequest(product_id, quantity);
      await fetchCart();
    } catch (err) {
      setCartError(err?.response?.data?.message || "Failed to update quantity");
    }
  };


  const removeFromCart = async (product_id) => {
    try {
      setCartError(null);
      await removeFromCartRequest(product_id);
      await fetchCart();
    } catch (err) {
      setCartError(err?.response?.data?.message || "Failed to remove item");
    }
  };


  const clearCart = async () => {
    try {
      setCartError(null);
      await clearCartRequest();
      await fetchCart();
    } catch (err) {
      setCartError(err?.response?.data?.message || "Failed to clear cart");
    }
  };


  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, total, cartError, addToCart, updateQuantity, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
