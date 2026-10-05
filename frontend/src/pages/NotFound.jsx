import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-rose-50 px-4 text-center">
      <h1 className="text-5xl font-bold text-rose-800">404</h1>
      <p className="text-gray-600">Sorry, this page doesn't exist.</p>
      <Link
        to="/"
        className="px-6 py-3 rounded-full bg-rose-800 text-white font-semibold hover:bg-rose-700 transition"
      >
        Return Home
      </Link>
    </div>
  );
}
