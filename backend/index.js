import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pkg;


// Postgres connection
// const pool = new Pool({
//   user: "postgres",      
//   host: "localhost",
//   database: "ecommerce", 
//   password: "Ff123456", 
//   port: 5432,
// });
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
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
