import express from 'express';
import bcrypt from 'bcrypt'; // hash password
import jwt from 'jsonwebtoken'; // login session
import cors from 'cors'; // allow React to talk to Node
import pkg from 'pg'; 

const app=express();
const { Pool } = pkg;
app.use(cors());
app.use(express.json());

// Postgres connection
const pool = new Pool({
  user: "postgres",      // change this
  host: "localhost",
  database: "cookieshop", // your DB name
  password: "Ff123456", // your password
  port: 5432,
});

// Test DB connection
pool.connect()
  .then(client => {
    console.log("Connected to Postgres!");
    client.release();
  })
  .catch(err => console.error("Postgres connection error:", err));


// Register
app.post('/api/register', async(req, res) => {
    console.log("Request body:", req.body); // 👈 add this
    const {email, password} = req.body;

    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, hashedPassword]);
        
        res.json({message: "user registered successfully"});
    }catch(err){
        console.error(err);
        res.status(400).json({error: "user already exists or invalid data"});
    }

});




// Login
app.post('/api/login', async(req, res) => {
    const {email, password} = req.body;

    try{
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if(result.rows.length === 0) {
            return res.status(400).json({error: "user not found"});
        }
        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({error: "invalid password"});
        }
        const token = jwt.sign({id: user.id, email: user.email}, 'your_jwt_secret', {expiresIn: '1h'});
        res.json({token, email: user.email});
    }catch(err){
        console.error(err);
        res.status(500).json({error: "server error"});
    }

});


app.listen(5000, () => console.log("Server running on http://localhost:5000"));

