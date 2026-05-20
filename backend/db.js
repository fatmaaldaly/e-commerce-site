import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pkg;


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});


// Test DB connection
pool.connect()
  .then(client => {
    console.log("Connected to Postgres!");
    client.release();
  })
  .catch(err => console.error("Postgres connection error:", err));


export default pool;
