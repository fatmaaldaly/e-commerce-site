import express from "express";
import {
  getAllCategories,
  getProductsByCategoryId
} from "../controllers/categoryController.js";
import { validateCategoryId 
} from "../middlewares/categoryMiddleware.js";

const router = express.Router();

// Get all categories
router.get("/", getAllCategories);

// Get products belonging to a specific category
router.get("/:category_id/products", validateCategoryId, getProductsByCategoryId);

export default router;