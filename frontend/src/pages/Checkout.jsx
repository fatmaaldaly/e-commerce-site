import React, { useState } from "react";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import checkout from "../services/checkoutService";

export default function Checkout() {
  const { cart } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    payment: "cod",
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
      await checkout(form);
      navigate("/success");
    } catch (err) {
      setError(
        err?.response?.data?.error ||
          "Something went wrong while placing the order"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <button>
        <a href="/shop" className="text-black">
          &larr; Back to Cart
        </a>
      </button>
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* LEFT SIDE - FORM */}
          <div className="p-6 md:p-10">
            <h2 className="text-2xl font-bold mb-6">Checkout</h2>

            {error && (
              <div className="mb-4 text-red-600 bg-red-100 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
                required
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone (11 digits)"
                value={form.phone}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
                required
              />

              <input
                type="text"
                name="address"
                placeholder="Delivery Address"
                value={form.address}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
                required
              />

              {/* PAYMENT */}
              <div className="pt-2">
                <h3 className="font-semibold mb-2">Payment Method</h3>

                <label className="flex items-center gap-2 mb-2 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={form.payment === "cod"}
                    onChange={handleChange}
                  />
                  Cash on Delivery
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    value="paymob"
                    checked={form.payment === "paymob"}
                    onChange={handleChange}
                  />
                  Paymob
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
              >
                Place Order
              </button>
            </form>
          </div>

          {/* RIGHT SIDE - CART SUMMARY */}
          <div className="bg-gray-50 p-6 md:p-10 border-t md:border-t-0 md:border-l">
            <h3 className="text-xl font-semibold mb-4">Your Order</h3>

            {cart.length === 0 ? (
              <p className="text-gray-500">No items in cart.</p>
            ) : (
              <div className="space-y-4 max-h-100 overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div
                    key={item.product_id}
                    className="flex gap-4 bg-white p-3 rounded-lg shadow-sm"
                  >
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />

                    <div className="flex-1">
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-gray-600">
                        Price: ${Number(item.price).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-semibold">
                        Subtotal: $
                        {Number(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 border-t pt-4">
              <h3 className="text-lg font-bold">
                Total: $
                {Number(
                  cart.reduce((sum, c) => sum + c.price * c.quantity, 0)
                ).toFixed(2)}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}