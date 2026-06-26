// model only communicate with DB

import pool from "../../db.js";

export const findUserByEmail = async (email) => {
  // $1 is a placeholder for the first parameter in the array that follows the query string. 
  // This helps prevent SQL injection attacks by safely parameterizing the query.
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
  // Database response looks like:
  // {
  //   rows: [
  //     {
  //       id: 1,
  //       email: "test@gmail.com",
  //       name: "Fatma",
  //       password: "hashed_password"
  //     }
  //   ]
  // }
  // So: rows → array of results, [0] → first user found
  return result.rows[0];
};


export const createUser = async ({
  full_name,
  email,
  password,
  auth_provider,
}) => {

  const result = await pool.query(
    `
    INSERT INTO users (full_name, email, password, auth_provider)
    VALUES ($1, $2, $3, $4)
    RETURNING user_id
    `,
    [full_name, email, password, auth_provider]
  );

  return result.rows[0];
};