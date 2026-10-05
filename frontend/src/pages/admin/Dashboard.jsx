import { useEffect, useState } from "react";
import api from "../../lib/api";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/admin/stats")
      .then((res) => setStats(res.data.data))
      .catch(() => setError("Failed to load stats"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-rose-800">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <Link to="/" className="text-sm text-gray-600 hover:underline">← Storefront</Link>
          <button onClick={logout} className="text-sm text-red-600 hover:underline">Logout</button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {loading && <p className="text-gray-500">Loading stats...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard label="Users" value={stats.userCount} />
            <StatCard label="Orders" value={stats.orderCount} />
            <StatCard label="Revenue" value={`EGP ${Number(stats.revenue).toLocaleString()}`} />
            <StatCard label="Products" value={stats.productCount} />
          </div>
        )}
      </main>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-2">
      <p className="text-sm text-gray-500 font-medium">{label}</p>
      <p className="text-3xl font-bold text-rose-800">{value}</p>
    </div>
  );
}
