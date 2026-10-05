import express from "express";
import rateLimit from "express-rate-limit";
import { registerUser, loginUser, googleLogin, logoutUser, getMe }
  from "../controllers/authController.js";
import { validateRegister, validateLogin }
  from "../middlewares/authValidationMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

// Limit login/register to 10 attempts per 15 minutes per IP
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => process.env.NODE_ENV === "test", // automated tests register many users
  message: { success: false, message: "Too many attempts, please try again in 15 minutes" },
});

const router = express.Router();

router.post("/register", authLimiter, validateRegister, registerUser);
router.post("/login", authLimiter, validateLogin, loginUser);
router.post("/google", authLimiter, googleLogin);
router.post("/logout", logoutUser);
router.get("/me", authMiddleware, getMe);

export default router;
