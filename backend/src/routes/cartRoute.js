import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {validateCart, validateCartInput} 
from "../middlewares/validateCartMiddleware.js";
import { addItem, getCart, removeItem, updateQuantity, clearCart} from "../controllers/cartController.js";


const router = express.Router();


// get user cart
router.get("/", authMiddleware, validateCart, getCart);

// ADD OR INCREMENT cart items
router.post("/add", authMiddleware, validateCart, validateCartInput, addItem);

// update cart items quantity
router.patch("/update", authMiddleware, validateCart, updateQuantity);

// clear entire cart
router.delete("/clear", authMiddleware, validateCart, clearCart);

// remove items from cart
router.delete("/:product_id", authMiddleware, validateCart, removeItem);


export default router;
