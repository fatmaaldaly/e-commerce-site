// handle req, res, & calling services

import * as authService from "../services/authService.js";

export const registerUser = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);

    res.status(201).json(result);

  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);

    res.status(200).json(result);

  } catch (error) {
    next(error);
  }
};