import {AppError} from "../utils/appError.js";


export const validateCategoryId = (req, res, next) => {
  const { category_id } = req.params;
  // convert to number first
  const id = Number(category_id);
  if (!category_id || Number.isNaN(id) || id <= 0) {
    throw new AppError("Category id must be a valid positive number", 400);
  }

  next();
};