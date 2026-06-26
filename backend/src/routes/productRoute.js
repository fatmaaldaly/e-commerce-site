import express from "express";
import { getAllProducts } from "../controllers/productController.js";

const router = express.Router();

// Get all products (with category name)
router.get("/", getAllProducts);


export default router;
