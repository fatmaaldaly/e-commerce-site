import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { token, authFetch } = useAuth();
  const [cart, setCart] = useState([]);

  // Fetch cart when user logs in / refreshes
  useEffect(() => {
    if (token) {
      fetchServerCart();
    } else {
      setCart([]);
    }
  }, [token]);

  const fetchServerCart = async () => {
    try {
      const res = await authFetch("http://localhost:5000/api/cart");
      const data = await res.json();
      setCart(data.items || []);
    } catch {
      setCart([]);
    }
  };


  // Add to cart
  const addToCart = async (product) => {
    await authFetch("http://localhost:5000/api/cart/add", {
      method: "POST",
      body: JSON.stringify({ product_id: product.product_id, quantity: 1 }),
    });

    fetchServerCart();
  };


  // Update quantity
  const updateQuantity = async (product_id, quantity) => {
    await authFetch("http://localhost:5000/api/cart/update", {
      method: "POST",
      body: JSON.stringify({ product_id, quantity }),
    });

    fetchServerCart();
  };


  // Remove item (quantity → 0 pattern)
  const removeFromCart = async (product_id) => {
    await authFetch("http://localhost:5000/api/cart/update", {
      method: "POST",
      body: JSON.stringify({ product_id, quantity: 0 }),
    });

    fetchServerCart();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        fetchServerCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
