import { AppError } from "../utils/appError.js";
import validator from "validator";


export const validateRegister = (req, res, next) => {
    const {full_name, email, password} = req.body;

    if (typeof full_name !== "string" || typeof email !== "string" || typeof password !== "string") {
        throw new AppError("All fields are required", 400);
    }

    if (!full_name.trim() || !email.trim() || !password) {
        throw new AppError("All fields are required", 400);
    }

    if (!validator.isEmail(email)) {
      throw new AppError("Invalid email format", 400);
    }

    if(password.length<8){
        throw new AppError("Password must be at least 8 characters", 400);
    }
    
    // input valid, move to controller
    next();
};


export const validateLogin = (req, res, next) => {
    const {email, password} = req.body;

    if (typeof email !== "string" || typeof password !== "string" || !email.trim() || !password) {
        throw new AppError("All fields are required", 400);
    }
    
    if (!validator.isEmail(email)) {
      throw new AppError("Invalid email format", 400);
    }

    next();
};