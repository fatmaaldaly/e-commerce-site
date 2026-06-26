// contains business logic, hashing, comparing passwords, generating token

import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../models/authModel.js";
import { generateToken } from "../utils/generateToken.js";
import { AppError } from "../utils/appError.js";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";

dotenv.config();


export const register = async ({ full_name, email, password }) => {

  const userExists = await findUserByEmail(email);

  if (userExists) {
     throw new AppError("Email already registered", 400);
  }
  
  // if user doesn't exist
  // hash password first
  const hashedPassword = await bcrypt.hash(password, 10);
  // then create new user
  const newUser = await createUser({
    full_name,
    email,
    password: hashedPassword,
    auth_provider: "local"
  });

  const token = generateToken(newUser.user_id, email);

  return {
    
      token,
      user: {
        user_id: newUser.user_id,
        full_name,
        email
      }
    
  };
};


export const login = async ({ email, password }) => {

  const user = await findUserByEmail(email);

  if (!user) {
    throw new AppError("Email not registered", 401);
  }
  
  if (user.auth_provider !== "local") {
  throw new AppError("Use Google login", 400);
}

  // IMPORTANT FIX
  if (!user.password) {
    throw new AppError("Invalid login method for this account", 400);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError("Invalid password", 401);
  }

  const token = generateToken(user.user_id, user.email);

  return {
    token,
    user: {
      user_id: user.user_id,
      full_name: user.full_name,
      email: user.email
    },
  
  };
};


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLoginService = async (credential) => {

  const ticket = await client.verifyIdToken({
      idToken: credential,
      audience:
        process.env.GOOGLE_CLIENT_ID,
    });

  const payload = ticket.getPayload();

  const email = payload.email;
  const full_name = payload.name;

  let user = await findUserByEmail(email);

  // CASE 1: USER EXISTS
  if (user) {
    if (user.auth_provider === "local") {
      throw new AppError(
        "Account exists with email/password. Please login normally.",
        400
      );
    }

    // already google user → continue login
  }

  // CASE 2: USER DOES NOT EXIST → CREATE GOOGLE USER
  if (!user) {
    user = await createUser({
      full_name,
      email,
      password: null,
      auth_provider: "google",
    });
  }

  const token = generateToken(user.user_id, user.email);

  return {
  
      token,
      user: {
        user_id: user.user_id,
        full_name: user.full_name,
        email: user.email,
      },
    
  };
};  