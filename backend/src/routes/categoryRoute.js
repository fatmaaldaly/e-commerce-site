import express from "express";
import pool from "../../db.js"; 
import {getAllCategories, getCategoryById } 
from "../controllers/categoryController.js";


const router = express.Router();

// Get all categories
router.get("/", getAllCategories);

// Get a specific category by ID
router.get("/:id", getCategoryById);


export default router;


