import jwt from "jsonwebtoken";
import { AppError } from "../utils/appError.js";

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      throw new AppError("Unauthorized: No session found", 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();

  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(new AppError("Session expired, please log in again", 401));
    }
    if (error.name === "JsonWebTokenError") {
      return next(new AppError("Invalid session token", 401));
    }
    next(error);
  }
};
