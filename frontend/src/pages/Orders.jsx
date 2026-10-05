import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { getMyOrdersRequest } from "../services/orderService";
import { getErrorMessage } from "../lib/api";

const formatPrice = (value) => `EGP ${Number(value).toFixed(2)}`;

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getMyOrdersRequest()
      .then(setOrders)
      .catch((err) => setError(getErrorMessage(err, "Failed to load your orders")))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <NavBar />
      <main className="max-w-4xl mx-auto px-4 py-10 min-h-[60vh]">
        <h1 className="text-3xl font-serif font-semibold text-rose-800 mb-8">My Orders</h1>

        {loading && <p className="text-gray-500">Loading your orders...</p>}
        {error && <p className="text-red-600 bg-red-100 p-3 rounded-lg">{error}</p>}

        {!loading && !error && orders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
            <Link to="/shop" className="px-6 py-3 rounded-full bg-rose-800 text-white font-semibold hover:bg-rose-700 transition">
              Start shopping
            </Link>
          </div>
        )}

        <ul className="space-y-6">
          {orders.map((order) => (
            <li key={order.order_id} className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex flex-wrap justify-between gap-2 mb-4">
                <div>
                  <p className="font-semibold">Order #{order.order_id}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-sm capitalize">
                    {order.order_status}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">
                    {order.payment_method === "cod" ? "Cash on Delivery" : order.payment_method}
                  </p>
                </div>
              </div>

              <ul className="divide-y divide-rose-100">
                {order.items.map((item) => (
                  <li key={item.product_id} className="flex items-center gap-4 py-3">
                    {item.image_url && (
                      <img src={item.image_url} alt={item.name} className="w-14 h-14 object-cover rounded-md" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} × {formatPrice(item.price)}
                      </p>
                    </div>
                    <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                  </li>
                ))}
              </ul>

              <p className="text-right font-bold mt-4">Total: {formatPrice(order.total_price)}</p>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
