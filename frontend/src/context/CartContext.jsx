import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { token, authFetch } = useAuth();
  const [cart, setCart] = useState([]);


  // Load cart on app start
  useEffect(() => {
    if (token) {
      fetchServerCart();
    } else {
      loadLocalCart();
    }
  }, [token]);


  // server cart for logged in users
  const fetchServerCart = async () => {
    try {
      const res = await authFetch("http://localhost:5000/api/cart");
      const data = await res.json();
      setCart(data.items || []);
    } catch {
      setCart([]);
    }
  };


  // local cart for guests
    const loadLocalCart = () => {
    const localCart = localStorage.getItem("guest_cart");
     setCart(localCart ? JSON.parse(localCart) : []);
  };

    const saveLocalCart = (newCart) => {
    localStorage.setItem("guest_cart", JSON.stringify(newCart));
    setCart(newCart);
  };


  // Add to cart
  const addToCart = async (product) => {
    if(token) {
      await authFetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        body: JSON.stringify({ product_id: product.product_id, quantity: 1 }),
      });
      await fetchServerCart();
    } else {
      // For guests, add to local cart(localstorage)
      const existing = cart.find((item) => item.product_id === product.product_id);
      let updatedCart;
      if (existing) {
        updatedCart = cart.map((item) =>
          item.product_id === product.product_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...cart, { ...product, quantity: 1 }];
      }
      saveLocalCart(updatedCart);
    }
  };


  // Update quantity
  const updateQuantity = async (product_id, quantity) => {
    if (quantity < 0) return;
    
    if(token){
      await authFetch("http://localhost:5000/api/cart/update", {
        method: "POST",
        body: JSON.stringify({ product_id, quantity }),
      });
      fetchServerCart();
    } else {
      // For guests: remove item if quantity is 0, otherwise update
      const updatedCart = quantity === 0
        ? cart.filter((item) => item.product_id !== product_id)
        : cart.map((item) =>
            item.product_id === product_id ? { ...item, quantity } : item
          );
      saveLocalCart(updatedCart);
    }
  };


  // Remove item from cart
  const removeFromCart = (product_id) => {
    updateQuantity(product_id, 0);
  };

  // Clear entire cart
  const clearCart = async () => {
    if(token){
      // For logged in users, clear on server by fetching cart and removing each item
      try {
        const res = await authFetch("http://localhost:5000/api/cart");
        const data = await res.json();
        
        // Delete each cart item
        for (const item of data.items || []) {
          await authFetch("http://localhost:5000/api/cart/update", {
            method: "POST",
            body: JSON.stringify({ product_id: item.product_id, quantity: 0 }),
          });
        }
        fetchServerCart();
      } catch (err) {
        console.error("Clear cart error:", err);
      }
    } else {
      // For guests, clear localStorage
      saveLocalCart([]);
    }
  };


  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
