
import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const { token } = useAuth(); 
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    address: "",
  });
  const [error, setError] = useState("");

  if (!token) return null;

  
  
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validatePhone = (phone) => /^[0-9]{11}$/.test(phone);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePhone(form.phone)) {
      setError("Phone number must be 11 digits");
      return;
    }

    if (!cart.length) {
      setError("Your cart is empty");
      return;
    }

    try {
      // 1) Create order
      const orderRes = await fetch("http://localhost:5000/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,  
        },
        body: JSON.stringify({}),
      });

      if (!orderRes.ok) throw new Error("Failed to create order");
      const orderData = await orderRes.json();
      if (!orderData.order_id) {
        throw new Error("Order ID missing");
      }
      const order_id = orderData.order_id;

      // 2) Pay for the order
      const paymentRes = await fetch("http://localhost:5000/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
        order_id,
        method: "card",
      })

      });

      if (!paymentRes.ok) throw new Error("Payment failed");

     
      clearCart();
      navigate("/success");
    } catch (err) {
      console.error(err);
      setError("Something went wrong while placing the order");
    }
  };

  return (
    <div className="checkout">
      <div className="checkout-card">
        <div className="left-side">
          <h2>Checkout</h2>
          <form className="checkout-form" onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone (11 digits)"
              value={form.phone}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Delivery Address"
              value={form.address}
              onChange={handleChange}
              required
            />

            <h3>Card Payment</h3>
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={form.cardNumber}
              onChange={handleChange}
              required
            />
            <div className="row">
              <input
                type="text"
                name="expiry"
                placeholder="MM/YY"
                value={form.expiry}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={form.cvv}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="checkout-btn">
              Place Order
            </button>
          </form>
        </div>

        <div className="vertical-line"></div>

        <div className="right-side">
          <h3>Your Order</h3>
          {cart.length === 0 ? (
            <p>No items in cart.</p>
          ) : (
            <ul className="summary-items">
              {cart.map((item) => (
                <li key={item.product_id} className="summary-item">
                  <img src={item.image_url} alt={item.name} className="summary-img" />
                  <div className="summary-info">
                    <h4>{item.name}</h4>
                    <p>Price: EGP {item.price}</p>
                    <p>Qty: {item.quantity}</p>
                    <p className="summary-subtotal">
                      Subtotal: EGP {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <h3 className="summary-total">
            Total: EGP {cart.reduce((sum, c) => sum + c.price * c.quantity, 0).toFixed(2)}
          </h3>
        </div>
      </div>
    </div>
  );
}

