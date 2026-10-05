import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, (req, res) => {
  res.status(501).json({ success: false, message: "Payment integration not yet implemented" });
});

export default router;
