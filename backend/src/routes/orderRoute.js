import express from "express";
import pool from "../../db.js"; 
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validateCart } from "../middlewares/validateCartMiddleware.js";
import { checkout} from "../controllers/orderController.js";

const router = express.Router();

// checkout route
router.post("/checkout", authMiddleware, validateCart, checkout);

export default router;
