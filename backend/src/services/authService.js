import bcrypt from "bcryptjs";
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

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await createUser({ full_name, email, password: hashedPassword, auth_provider: "local" });

  const token = generateToken(newUser.user_id, email, newUser.role);

  return {
    token,
    user: { user_id: newUser.user_id, full_name, email, role: newUser.role },
  };
};


export const login = async ({ email, password }) => {
  const user = await findUserByEmail(email);

  // Same message for unknown email and wrong password, so the API
  // doesn't reveal which emails are registered.
  if (!user) throw new AppError("Invalid email or password", 401);
  if (user.auth_provider !== "local") throw new AppError("Use Google login", 400);
  if (!user.password) throw new AppError("Invalid login method for this account", 400);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new AppError("Invalid email or password", 401);

  const token = generateToken(user.user_id, user.email, user.role);

  return {
    token,
    user: { user_id: user.user_id, full_name: user.full_name, email: user.email, role: user.role },
  };
};


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLoginService = async (credential) => {
  if (!credential || typeof credential !== "string") {
    throw new AppError("Google credential is required", 400);
  }

  let payload;
  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    payload = ticket.getPayload();
  } catch {
    throw new AppError("Invalid Google credential", 401);
  }

  if (!payload?.email || !payload.email_verified) {
    throw new AppError("Google account email is not verified", 401);
  }

  const email = payload.email;
  const full_name = payload.name;

  let user = await findUserByEmail(email);

  if (user) {
    if (user.auth_provider === "local") {
      throw new AppError("Account exists with email/password. Please login normally.", 400);
    }
  } else {
    user = await createUser({ full_name, email, password: null, auth_provider: "google" });
  }

  const token = generateToken(user.user_id, user.email, user.role);

  return {
    token,
    user: { user_id: user.user_id, full_name: user.full_name, email: user.email, role: user.role },
  };
};
