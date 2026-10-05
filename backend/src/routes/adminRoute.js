import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import { getDashboardStats } from "../controllers/adminController.js";

const router = express.Router();

router.use(authMiddleware, adminMiddleware);

router.get("/stats", getDashboardStats);

export default router;
