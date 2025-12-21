import React from "react";


export default function Success() {
  return (
    <div className="success-container">
      <h1>Order Successful 🎉</h1>
      <p>Thank you! Your order has been placed.</p>
      <button onClick={() => window.location.href = "/"}>Return to Home page</button>
    </div>
  );
}
