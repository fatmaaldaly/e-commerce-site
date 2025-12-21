import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken"; 
import express from "express";
import pool from "../index.js"; 
import dotenv from "dotenv";


dotenv.config();
const router = express.Router();


// Register 
router.post("/register", async (req, res) => {
  
  // destrucutre the req.body json format from the frontend to access every element separately
  const { fullName, email, password} = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

  // CRUD: create new user
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await pool.query(
  "INSERT INTO users (fullName, email, password) VALUES ($1, $2, $3) RETURNING user_id",
  [fullName, email, hashedPassword]
  );
  const userId = newUser.rows[0].user_id;

   // Generate token
    const token = jwt.sign(
      { user_id: userId, email },
      process.env.JWT_SECRET,
      { expiresIn: "5h" }
    );

    res.json({
      message: "User registered successfully",
      token,
      user: { id: userId, fullName, email }
    });
  
   // If something fails (like a database error), it logs it in your terminal and tells the frontend something went wrong 
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ error: "Server error during registration" });
  }


});




// Login 
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rows.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    const user = result.rows[0];
    // compares the password with the one saved in the db if match then a valid user
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // generate JWT token (keep in .env), this token will be sent to the frontend, stored in localStorage, 
    // and used to access protected routes later like products/profile
    const token = jwt.sign(
      {user_id: user.user_id, email: user.email}, 
      process.env.JWT_SECRET, 
      { expiresIn: "5h" } 
    );
    

    // send back response
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.user_id,
        fullName: user.fullName,
        email: user.email,
      },
    });
    

  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Server error during login" });
  }
});

export default router;
