import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { token, authFetch } = useAuth();

  /* =========================
     STATE (guest-first)
  ========================== */
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("guest_cart");
    return stored ? JSON.parse(stored) : [];
  });

  /* =========================
     PERSIST GUEST CART
  ========================== */
  useEffect(() => {
    if (!token) {
      localStorage.setItem("guest_cart", JSON.stringify(cart));
    }
  }, [cart, token]);

  /* =========================
     FETCH USER CART
  ========================== */
  const fetchServerCart = useCallback(async () => {
    if (!token) return;

    try {
      const res = await authFetch("http://localhost:5000/api/cart");
      const data = await res.json();
      setCart(data.items || []);
    } catch {
      setCart([]);
    }
  }, [token, authFetch]);

  /* =========================
     SYNC GUEST CART ON LOGIN
  ========================== */
  useEffect(() => {
    if (!token) return;

    const syncGuestCart = async () => {
      const guestCart = JSON.parse(localStorage.getItem("guest_cart") || "[]");

      for (const item of guestCart) {
        try {
          await authFetch("http://localhost:5000/api/cart/add", {
            method: "POST",
            body: JSON.stringify({
              product_id: item.product_id,
              quantity: item.quantity,
            }),
          });
        } catch {
          return;
        }
      }

      localStorage.removeItem("guest_cart");
      fetchServerCart();
    };

    syncGuestCart();
  }, [token, fetchServerCart, authFetch]);

  /* =========================
     ADD TO CART
  ========================== */
  const addToCart = (product) => {
    // Always update UI first
    setCart((prev) => {
      const existing = prev.find((i) => i.product_id === product.product_id);
      if (existing) {
        return prev.map((i) =>
          i.product_id === product.product_id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    if (!token) return;

    authFetch("http://localhost:5000/api/cart/add", {
      method: "POST",
      body: JSON.stringify({
        product_id: product.product_id,
        quantity: 1,
      }),
    }).catch(() => {});
  };

  /* =========================
     UPDATE QUANTITY (POST /update)
  ========================== */
  const updateQuantity = (product_id, quantity) => {
    if (quantity < 1) {
      removeFromCart(product_id);
      return;
    }

    setCart((prev) =>
      prev.map((i) =>
        i.product_id === product_id ? { ...i, quantity } : i
      )
    );

    if (!token) return;

    authFetch("http://localhost:5000/api/cart/update", {
      method: "POST",
      body: JSON.stringify({ product_id, quantity }),
    }).catch(() => {});
  };

  /* =========================
     REMOVE FROM CART (LOCAL ONLY)
  ========================== */
  const removeFromCart = (product_id) => {
    setCart((prev) => prev.filter((i) => i.product_id !== product_id));

    // Backend has no remove route → handled implicitly by update logic
  };

  /* =========================
     CLEAR CART
  ========================== */
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("guest_cart");
    // Backend has no clear route
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        fetchServerCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
