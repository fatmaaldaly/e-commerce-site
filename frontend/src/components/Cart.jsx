import React, { useState } from "react";
import "../style.css";
import { useCart } from "../context/CartContext";

export default function Cart({ isOpen, onClose }) {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const [quantity, setQuantity] = useState(0);

  return (
    <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-cart-btn" onClick={onClose}>
        ✕
      </button>

      <h2 style={{marginTop:20, marginBottom:20}}>Your Cart</h2>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        // <ul className="cart-items">
        //   {cart.map((item) => (
        //     <li key={item.product_id} className="cart-item">
        //       <div>
        //         <p className="cart-item-name">{item.name}</p>
        //         <p className="cart-item-details">
        //           {item.quantity} × ${item.price}
        //         </p>
        //       </div>
        //       <button
        //         className="remove-btn"
        //         onClick={() => removeFromCart(item.id)}
        //       >
        //         🗑️
        //       </button>
        //     </li>
        //   ))}
        // </ul>
        <ul className="cart-items">
          {cart.map((item) => (
            <li key={item.product_id} className="cart-item">
              <img
                src={item.image_url}
                alt={item.name}
                className="cart-item-image"
              />

              <div className="cart-item-details">
                <h4>{item.name}</h4>
                <p>${item.price}</p>
              </div>

              <div className="cart-item-quantity">
                <button onClick={()=> updateQuantity(item.product_id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={()=> updateQuantity(item.product_id, item.quantity + 1)}>+</button>
              </div>

              <div className="cart-item-price">
                ${(item.price * item.quantity).toFixed(2)}
              </div>

              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.product_id)}
              >
                ✕
              </button>
            </li>
          ))}
     </ul>

      )}


      {/* {cart.length > 0 && (
        <>
          <div className="cart-total">
            <span>Subtotal:</span>
            <span className="total-amount">${cartTotal.toFixed(2)}</span>
          </div>
          <button className="checkout-btn">Proceed to Checkout</button>
          <button className="clear-cart-btn" onClick={clearCart}>
            Clear Cart
          </button>
        </>
      )} */}

      {cart.length > 0 && (

        <button className="clear-cart-btn" onClick={clearCart}>
          Clear Cart
        </button>
      )}
    </div>
  );
}
