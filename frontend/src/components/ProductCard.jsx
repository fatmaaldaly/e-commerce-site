import React from "react";


export default function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="product-card">
      <img
        src={product.image_url || "https://placehold.co/300x200?text=No+Image"}
        alt={product.name}
        className="product-image"
        onError={(e) => (e.target.src = "https://placehold.co/300x200?text=No+Image")}
      />
      {/* <h3 className="product-name">{product.name}</h3>
      <p className="product-price">${product.price}</p>
      <button className="add-to-cart">Add to Cart</button> */}
      {/* Name and price on the same line */}
  <div className="product-header">
    <h3 className="product-name">{product.name}</h3>
    <p className="product-price">${product.price}</p>
  </div>

  {/* Quantity and Add button on one row */}
  <div className="product-footer">
    <div className="quantity-controls">
      <button className="qty-btn" onClick={()=>setQuantity((prev)=>prev-1)}>-</button>
      <span className="qty-value">{quantity}</span>
      <button className="qty-btn" onClick={()=>setQuantity((prev)=>prev+1)}>+</button>
    </div>

    {/* <button className="add-to-cart">Add</button> */}
  </div>
    </div>
  );
}
