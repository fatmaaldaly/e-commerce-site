import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();


// for token
export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    req.user = null;
    return next();
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { user_id, email }
    next();

  } catch (err) {
    console.error("JWT Verification Failed:", err.message);
    return res.status(401).json({ error: "Invalid or expired token. Please log in again." });
    
  }
  
};
