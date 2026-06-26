// handle req, res, & calling services
// pass req data to service, get back data, send response

import { register, login, googleLoginService} 
from "../services/authService.js";
import { findUserByEmail, createUser } 
from "../models/authModel.js";


export const registerUser = async (req, res, next) => {
  try {
    const data = await register(req.body);
    res.status(201).json({
      success: true, 
      message: "User registered successfully", 
      data
    });
   
  } catch (error) {
    next(error);
  }
};


export const loginUser = async (req, res, next) => {
  try {
    const data = await login(req.body);
    res.status(200).json({
      success: true, 
      message: "Login successful", 
      data
    });

  } catch (error) {
    next(error);
  }
};


export const googleLogin = async (req, res, next) => {
  try {
    const data = await googleLoginService(
        req.body.credential
      );

    res.status(200).json({
      success: true,  
      message: "Google login successful", 
      data
    });

  } catch (error) {
    next(error);
  }
};