import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, clearCart } = useCart();
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

    const orderData = {
      customer_name: form.name,
      phone: form.phone,
      address: form.address,
      card_last4: form.cardNumber.slice(-4),
      items: cart.map((c) => ({
        product_id: c.product_id,
        quantity: c.quantity,
        price: c.price,
      })),
      total: cart.reduce((sum, c) => sum + c.price * c.quantity, 0),
    };

    try {
      const res = await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        clearCart();
        navigate("/success");
      } else {
        setError("Failed to place order");
      }
    } catch {
      setError("Something went wrong");
    }
  };

  // return (
  //   <div className="checkout">
  //   <div className="checkout-wrapper">
      
  //     <div className="checkout-container">
  //       <h2>Checkout</h2>

  //       <form className="checkout-form" onSubmit={handleSubmit}>
  //         {error && <p className="error">{error}</p>}

  //         <input
  //           type="text"
  //           name="name"
  //           placeholder="Full Name"
  //           value={form.name}
  //           onChange={handleChange}
  //           required
  //         />

  //         <input
  //           type="text"
  //           name="phone"
  //           placeholder="Phone (11 digits)"
  //           value={form.phone}
  //           onChange={handleChange}
  //           required
  //         />

  //         <input
  //           type="text"
  //           name="address"
  //           placeholder="Delivery Address"
  //           value={form.address}
  //           onChange={handleChange}
  //           required
  //         />

  //         <h3>Card Payment</h3>

  //         <input
  //           type="text"
  //           name="cardNumber"
  //           placeholder="Card Number"
  //           value={form.cardNumber}
  //           onChange={handleChange}
  //           required
  //         />

  //         <div className="row">
  //           <input
  //             type="text"
  //             name="expiry"
  //             placeholder="MM/YY"
  //             value={form.expiry}
  //             onChange={handleChange}
  //             required
  //           />
  //           <input
  //             type="text"
  //             name="cvv"
  //             placeholder="CVV"
  //             value={form.cvv}
  //             onChange={handleChange}
  //             required
  //           />
  //         </div>

  //         <button type="submit" className="checkout-btn">
  //           Place Order
  //         </button>
  //       </form>
  //     </div>

      
  //     <div className="cart-summary">
  //       <h3>Your Order</h3>

  //       {cart.length === 0 ? (
  //         <p>No items in cart.</p>
  //       ) : (
  //         <ul className="summary-items">
  //           {cart.map((item) => (
  //             <li key={item.product_id} className="summary-item">
  //               <img src={item.image_url} alt={item.name} className="summary-img" />

  //               <div className="summary-info">
  //                 <h4>{item.name}</h4>
  //                 <p>Price: EGP {item.price}</p>
  //                 <p>Qty: {item.quantity}</p>
  //                 <p className="summary-subtotal">
  //                   Subtotal: EGP {(item.price * item.quantity).toFixed(2)}
  //                 </p>
  //               </div>
  //             </li>
  //           ))}
  //         </ul>
  //       )}

  //       <h3 className="summary-total">
  //         Total: EGP {cart.reduce((sum, c) => sum + c.price * c.quantity, 0).toFixed(2)}
  //       </h3>
  //     </div>
  //   </div>
  //   </div>
  // );
  return (
  <div className="checkout">

    {/* ONE BIG CARD */}
    <div className="checkout-card">

      {/* LEFT SIDE — FORM */}
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

      {/* VERTICAL SEPARATOR */}
      <div className="vertical-line"></div>

      {/* RIGHT SIDE — ORDER SUMMARY */}
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
