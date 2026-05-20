import jwt from "jsonwebtoken";

export const generateToken = (user_id, email) => {
  return jwt.sign(
    { user_id, email },
    process.env.JWT_SECRET,
    { expiresIn: "5h" }
  );
};