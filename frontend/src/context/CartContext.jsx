import { createContext, useState, useEffect } from "react";
import {
  getCartRequest,
  addToCartRequest,
  updateQuantityRequest,
  // removeFromCartRequest,
  clearCartRequest,
} from "../services/cartService";
import { useAuth } from "../hooks/useAuth";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { token } = useAuth();
  const [cart, setCart] = useState([]);

  // fetch cart
  const fetchCart = async () => {
    if (!token) return;
    const data = await getCartRequest(token);
    console.log("CART API RESPONSE:", data);
    setCart(data.items || []);
  };

  useEffect(() => {
    fetchCart();
  }, [token]);


  const addToCart = async (product) => {
    if (!token) {
      window.location.href = "/login";
      return;
    }

    await addToCartRequest(product.product_id, token);
    fetchCart();
  };

  
  const updateQuantity = async (productId, quantity) => {
    if (quantity <= 0) return;

    await updateQuantityRequest(productId, quantity, token);
    fetchCart();
  };


//  const removeFromCart = async (productId) => {
//     await removeFromCartRequest(productId, token);
//     fetchCart();
//   };


  const clearCart = async () => {
    await clearCartRequest(token);
    fetchCart();
  };


  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        addToCart,
        updateQuantity,
        // removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;