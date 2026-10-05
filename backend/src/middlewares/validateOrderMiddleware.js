import { AppError } from "../utils/appError.js";

export const validateOrder = (req, res, next) => {
  const { name, phone, address, payment } = req.body;

  if (!name?.trim()) {
    return next(new AppError("Full name is required", 400));
  }

  if (!phone?.trim() || !/^[0-9]{7,15}$/.test(phone.trim())) {
    return next(new AppError("A valid phone number is required (7–15 digits)", 400));
  }

  if (!address?.trim()) {
    return next(new AppError("Shipping address is required", 400));
  }

  const allowedPayments = ["cod", "paymob"];
  if (!payment || !allowedPayments.includes(payment)) {
    return next(new AppError(`Payment method must be one of: ${allowedPayments.join(", ")}`, 400));
  }

  next();
};
