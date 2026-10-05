import { Link, Navigate, useLocation } from "react-router-dom";

export default function Success() {
  const location = useLocation();

  // Only reachable right after checkout; visiting /success directly goes home.
  // (The server already empties the cart as part of placing the order.)
  if (!location.state?.orderPlaced) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-rose-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-md">
        <div className="text-5xl mb-4">✓</div>
        <h1 className="text-3xl font-bold text-rose-800 mb-2">Order Placed!</h1>
        <p className="text-gray-600 mb-6">
          Thank you! Your order has been placed and is being processed.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/orders"
            className="px-6 py-3 rounded-full bg-rose-800 text-white font-semibold hover:bg-rose-700 transition"
          >
            View My Orders
          </Link>
          <Link
            to="/"
            className="px-6 py-3 rounded-full border border-rose-800 text-rose-800 font-semibold hover:bg-rose-50 transition"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
