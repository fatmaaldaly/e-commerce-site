import React, { useState } from "react";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import checkout from "../services/checkoutService";
import { getErrorMessage } from "../lib/api";

export default function Checkout() {
  const { cart, fetchCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    payment: "cod",
  });

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!isAuthenticated) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // same rule as the backend (validateOrderMiddleware)
  const validatePhone = (phone) => /^[0-9]{7,15}$/.test(phone.trim());

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    if (!form.name.trim() || !form.address.trim()) {
      setError("Please fill in your name and address");
      return;
    }

    if (!validatePhone(form.phone)) {
      setError("Phone number must be 7–15 digits");
      return;
    }

    if (!cart.length) {
      setError("Your cart is empty");
      return;
    }

    try {
      setError("");
      setSubmitting(true);
      await checkout(form);
      await fetchCart(); // the server empties the cart after a successful order
      navigate("/success", { state: { orderPlaced: true } });
    } catch (err) {
      setError(getErrorMessage(err, "Something went wrong while placing the order"));
      fetchCart(); // stock may have changed, refresh the summary
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <Link to="/shop" className="inline-block mb-4 text-black hover:underline">
        &larr; Continue shopping
      </Link>
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
                type="tel"
                name="phone"
                placeholder="Phone number"
                inputMode="numeric"
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

                {/* Online payment isn't implemented yet, so it can't be selected */}
                <label className="flex items-center gap-2 text-gray-400 cursor-not-allowed">
                  <input type="radio" name="payment" value="paymob" disabled />
                  Card payment (Paymob) — coming soon
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Placing order..." : "Place Order"}
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
                        Price: EGP {Number(item.price).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-semibold">
                        Subtotal: EGP{" "}
                        {Number(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 border-t pt-4">
              <h3 className="text-lg font-bold">
                Total: EGP{" "}
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