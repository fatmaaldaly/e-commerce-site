
import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ products = [] }) {
  const list = Array.isArray(products) ? products : [];
  const { cart, addToCart, updateQuantity } = useCart();
  const [qtyMap, setQtyMap] = useState({});
  const [hoveredId, setHoveredId] = useState(null);


  useEffect(() => {
  const map = {};
  list.forEach((p) => {
    const inCart = cart.find((i) => i.product_id === p.product_id);
    map[p.product_id] = inCart?.quantity ?? 0; 
  });
  setQtyMap(map);
 }, [list, cart]);



const changeQty = (productId, delta) => {
  const prevQ = qtyMap[productId] ?? 0;
  const nextQ = Math.max(0, prevQ + delta);

  // Update local UI state only
  setQtyMap((prev) => ({
    ...prev,
    [productId]: nextQ,
  }));

  // Update global cart state AFTER
  const inCart = cart.find((i) => i.product_id === productId);
  const product = list.find((p) => p.product_id === productId);

  if (inCart) {
    if (nextQ === 0) {
      updateQuantity(productId, 0);
    } else {
      updateQuantity(productId, nextQ);
    }
  } else if (product && nextQ > 0) {
    addToCart(product);
  }
};



const handleAdd = (productId) => {
  const product = list.find((p) => p.product_id === productId);
  if (!product) return;

  addToCart(product);

  setQtyMap((prev) => ({
    ...prev,
    [productId]: (prev[productId] ?? 0) + 1,
  }));
};



  return (
    <main className="shop-products">
      {list.length > 0 ? (
        <div className="product-grid">
          {list.map((product) => (
            <div key={product.product_id} className="product-card"
             onMouseEnter={() => setHoveredId(product.product_id)}
              onMouseLeave={() => setHoveredId(null)}
              >
              <img
                src={product.image_url}
                alt={product.name}
                className="product-image"
              />

              <div className="product-header">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">EGP {product.price}</p>
              </div>

              <div className="product-footer">
                <div className="quantity-controls">
                  <button
                    className="qty-btn"
                    onClick={() => changeQty(product.product_id, -1)}
                  >
                    -
                  </button>
                  <span className="qty-value">{qtyMap[product.product_id] ?? 0}</span>

                  <button
                    className="qty-btn"
                    onClick={() => changeQty(product.product_id, 1)}
                  >
                    +
                  </button>
                </div>

                <button
                  className="add-to-cart"
                  onClick={() => handleAdd(product.product_id)}
             
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-products">No products found.</p>
      )}
    </main>
  );
}

