// middleware: Reusable request processing
// for routes that require logged-in users

// JWT: constains  User ID, Email, Expiration, Signature
import jwt from "jsonwebtoken"; 
import { AppError } from "../utils/appError.js";


// next -> function that moves request to next step
export const authMiddleware = (req, res, next) => {

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      throw new AppError("Unauthorized: No token provided", 401);
    }

    // extract token from header
    // ["Bearer", "abc123token"] -> abc123token
    const token = authHeader.split(" ")[1];
    
    // verify token
    // check if token is valid, not expired, and signed by my server
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;
    // continue request
    next();

  } catch (error) {
    if (error.name === "TokenExpiredError") {
        return next(new AppError("Token expired", 401));
      }

      if (error.name === "JsonWebTokenError") {
        return next(new AppError("Invalid token", 401));
      }

    next(error);
  }
};