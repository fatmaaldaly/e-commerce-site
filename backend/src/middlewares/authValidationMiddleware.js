import { AppError } from "../utils/appError.js";
import validator from "validator";


export const validateRegister = (req, res, next) => {
    const {full_name, email, password} = req.body;
    
    if (!full_name?.trim() || !email?.trim() || !password) {
        throw new AppError("All fields are required", 400);
    }

    if (!validator.isEmail(email)) {
      throw new AppError("Invalid email format", 400);
    }

    if(password.length<6){
        throw new AppError("Password must be at least 6 characters", 400);
    }
    
    // input valid, move to controller
    next();
};


export const validateLogin = (req, res, next) => {
    const {email, password} = req.body;
    
    if (!email?.trim() || !password) {
        throw new AppError("All fields are required", 400);
    }
    
    if (!validator.isEmail(email)) {
      throw new AppError("Invalid email format", 400);
    }

    next();
};