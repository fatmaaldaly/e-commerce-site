import { AppError } from "../utils/appError.js";

// Only cash on delivery is supported for now. Add "paymob" back here once
// the payment integration (paymentRoute) is implemented.
const ALLOWED_PAYMENTS = ["cod"];

const isFilledString = (value) => typeof value === "string" && value.trim().length > 0;

export const validateOrder = (req, res, next) => {
  const { name, phone, address, payment } = req.body;

  if (!isFilledString(name)) {
    return next(new AppError("Full name is required", 400));
  }

  if (!isFilledString(phone) || !/^[0-9]{7,15}$/.test(phone.trim())) {
    return next(new AppError("A valid phone number is required (7–15 digits)", 400));
  }

  if (!isFilledString(address)) {
    return next(new AppError("Shipping address is required", 400));
  }

  if (!ALLOWED_PAYMENTS.includes(payment)) {
    return next(new AppError("Only Cash on Delivery is available at the moment", 400));
  }

  next();
};
