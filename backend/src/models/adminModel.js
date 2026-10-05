import pool from "../db.js";

export const getStats = async () => {
  const [users, orders, products] = await Promise.all([
    pool.query("SELECT COUNT(*) FROM users"),
    pool.query(
      "SELECT COUNT(*), COALESCE(SUM(total_price), 0) AS revenue FROM orders",
    ),
    pool.query("SELECT COUNT(*) FROM products"),
  ]);

  return {
    userCount: parseInt(users.rows[0].count),
    orderCount: parseInt(orders.rows[0].count),
    revenue: parseFloat(orders.rows[0].revenue),
    productCount: parseInt(products.rows[0].count),
  };
};
