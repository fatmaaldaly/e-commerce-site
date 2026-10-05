import jwt from "jsonwebtoken";

export const generateToken = (user_id, email, role = "user") => {
  return jwt.sign(
    { user_id, email, role },
    process.env.JWT_SECRET,
    { expiresIn: "5h" }
  );
};
