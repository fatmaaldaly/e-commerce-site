import { AppError } from "../utils/appError.js";

export const adminMiddleware = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return next(new AppError("Forbidden: admin access required", 403));
  }
  next();
};
