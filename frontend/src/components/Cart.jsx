import React, { useState } from "react";
import "../style.css";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";



export default function Cart({isOpen, onClose}) {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  

  const navigate = useNavigate();


  
  return (
    <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-cart-btn" onClick={onClose}>
        ✕
      </button>

      <h2 style={{marginTop:20, marginBottom:20}}>Your Cart</h2>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (

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
                <p>EGP{item.price}</p>
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


      {cart.length > 0 && (
         <>
        <button
          className="checkout-btn"
          onClick={() => navigate("/checkout", { state: { cart } })}
        >
          Proceed to Checkout
        </button>

        <button className="clear-cart-btn" onClick={clearCart}>
          Clear Cart
        </button>
         </>
      )}
      
    </div>

   
  );
}
