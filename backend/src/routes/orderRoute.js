import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validateCart } from "../middlewares/validateCartMiddleware.js";
import { validateOrder } from "../middlewares/validateOrderMiddleware.js";
import { checkout } from "../controllers/orderController.js";

const router = express.Router();

router.post("/checkout", authMiddleware, validateCart, validateOrder, checkout);

export default router;
