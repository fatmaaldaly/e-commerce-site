import { register, login, googleLoginService } from "../services/authService.js";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 5 * 60 * 60 * 1000, // 5 hours — matches JWT expiry
};


export const registerUser = async (req, res, next) => {
  try {
    const data = await register(req.body);
    res.cookie("token", data.token, COOKIE_OPTIONS);
    res.status(201).json({ success: true, message: "User registered successfully", data: { user: data.user } });
  } catch (error) {
    next(error);
  }
};


export const loginUser = async (req, res, next) => {
  try {
    const data = await login(req.body);
    res.cookie("token", data.token, COOKIE_OPTIONS);
    res.status(200).json({ success: true, message: "Login successful", data: { user: data.user } });
  } catch (error) {
    next(error);
  }
};


export const googleLogin = async (req, res, next) => {
  try {
    const data = await googleLoginService(req.body.credential);
    res.cookie("token", data.token, COOKIE_OPTIONS);
    res.status(200).json({ success: true, message: "Google login successful", data: { user: data.user } });
  } catch (error) {
    next(error);
  }
};


export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  res.status(200).json({ success: true, message: "Logged out" });
};


export const getMe = (req, res) => {
  res.status(200).json({ success: true, data: { user: req.user } });
};
