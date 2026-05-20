// models only communicate with DB

import pool from "../../db.js";

export const findUserByEmail = async (email) => {

  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  return result.rows[0];
};

export const createUser = async ({
  fullName,
  email,
  password
}) => {

  const result = await pool.query(
    `
    INSERT INTO users (fullName, email, password)
    VALUES ($1, $2, $3)
    RETURNING user_id
    `,
    [fullName, email, password]
  );

  return result.rows[0];
};