import express from "express";
import pool from "../../db.js"; 
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();


// PAYMENTS — PAY ORDER
router.post("/", authMiddleware);

export default router;
