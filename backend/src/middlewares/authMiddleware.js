// middleware: Reusable request processing
// for routes that require logged-in users

import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  console.log("Authorization Header:", req.headers.authorization);

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "Unauthorized"
      });
    }

    // extract token from header
    // ex: Bearer abc123token -> abc123token
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
    next(error);
  }
};