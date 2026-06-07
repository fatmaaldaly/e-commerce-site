// handle req, res, & calling services

import * as authService from "../services/authService.js";


export const registerUser = async (req, res, next) => {
  try {
    const data = await authService.register(req.body);
    res.status(201).json(data);

  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const data = await authService.login(req.body);
    res.status(200).json(data);

  } catch (error) {
    next(error);
  }
};