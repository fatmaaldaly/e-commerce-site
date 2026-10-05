import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

const isProduction = process.env.NODE_ENV === "production";

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  // Require SSL in production (cloud Postgres providers mandate this)
  ...(isProduction && { ssl: { rejectUnauthorized: false } }),
});

pool
  .connect()
  .then((client) => {
    console.log("Connected to Postgres!");
    client.release();
  })
  .catch((err) => console.error("Postgres connection error:", err));

export default pool;
