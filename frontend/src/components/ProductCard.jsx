import React from "react";


export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img
        src={product.image_url || "https://placehold.co/300x200?text=No+Image"}
        alt={product.name}
        className="product-image"
        onError={(e) => (e.target.src = "https://placehold.co/300x200?text=No+Image")}
      />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">${product.price}</p>
      <button className="add-to-cart">Add to Cart</button>
    </div>
  );
}
