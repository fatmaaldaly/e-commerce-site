import React, { createContext, useState, useContext } from "react";

// Create context, container that will hold all the cart data and functions.
const CartContext = createContext();

// Custom hook to use cart easily
export const useCart = () => useContext(CartContext);

// Cart Provider
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add item to cart
  const addToCart = (product) => {
    // console.log("Adding product:", product);
    setCart((prevCart) => {
      // check if product already in cart
      const existingItem = prevCart.find((item) => item.product_id === product.product_id);
      if (existingItem) {
        // if exists, increase quantity
        return prevCart.map((item) =>
          item.product_id === product.product_id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // add new item
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove item
  const removeFromCart = (product_id) => {
    setCart((prevCart) => prevCart.filter((item) => item.product_id !== product_id));
  };

  // Clear all items
  const clearCart = () => setCart([]);

  // quantity\
  const updateQuantity = (productId, newQuantity) => {
  setCart((prevCart) =>
    prevCart.map((item) =>
      item.product_id === productId
        ? { ...item, quantity: Math.max(newQuantity, 0) } 
        : item
    )
  );
};


  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
