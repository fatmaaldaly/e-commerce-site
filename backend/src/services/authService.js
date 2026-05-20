// contains business logic, hashing, comparing passwords, generating token

import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../models/authModel.js";
import { generateToken } from "../utils/generateToken.js";

export const register = async ({ fullName, email, password }) => {

  const userExists = await findUserByEmail(email);

  if (userExists) {
    const error = new Error("User already exists");
    error.status = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await createUser({
    fullName,
    email,
    password: hashedPassword
  });

  const token = generateToken(newUser.user_id, email);

  return {
    message: "User registered successfully",
    token,
    user: {
      id: newUser.user_id,
      fullName,
      email
    }
  };
};

export const login = async ({ email, password }) => {

  const user = await findUserByEmail(email);

  if (!user) {
    const error = new Error("User not found");
    error.status = 400;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    const error = new Error("Invalid password");
    error.status = 400;
    throw error;
  }

  const token = generateToken(user.user_id, user.email);

  return {
    message: "Login successful",
    token,
    user: {
      id: user.user_id,
      fullName: user.fullname,
      email: user.email
    }
  };
};