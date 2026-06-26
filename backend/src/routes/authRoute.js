// routes only define endpoints
// route -> controller -> service -> model -> database

import express from "express";
import {registerUser, loginUser, googleLogin
} from "../controllers/authController.js";
import {validateRegister, validateLogin
} from "../middlewares/authValidationMiddleware.js";

const router = express.Router();

router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);
router.post("/google", googleLogin);

export default router;