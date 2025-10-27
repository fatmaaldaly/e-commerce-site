import pkg from 'pg';

const { Pool } = pkg;


// Postgres connection
const pool = new Pool({
  user: "postgres",      
  host: "localhost",
  database: "ecommerce", 
  password: "Ff123456", 
  port: 5432,
});


// Test DB connection
pool.connect()
  .then(client => {
    console.log("Connected to Postgres!");
    client.release();
  })
  .catch(err => console.error("Postgres connection error:", err));


export default pool;
