// api layer for communication with backend

const API_URL = "http://localhost:5000";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const loginRequest = async (email, password) => {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({ email, password }),
  });

  // return res.json();
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

export const registerRequest = async (fullName, email, password) => {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({ fullName, email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;

  // return res.json();
};