import api from "../lib/api";

export const registerRequest = async (fullName, email, password) => {
  try {
    const res = await api.post("/auth/register", { full_name: fullName, email, password });
    return res.data.data; // { user: { user_id, full_name, email, role } }
  } catch (error) {
    return { error: error.response?.data?.message || "Registration failed" };
  }
};

export const loginRequest = async (email, password) => {
  try {
    const res = await api.post("/auth/login", { email, password });
    return res.data.data; // { user: { user_id, full_name, email, role } }
  } catch (error) {
    return { error: error.response?.data?.message || "Login failed" };
  }
};

export const googleLoginRequest = async (credential) => {
  try {
    const res = await api.post("/auth/google", { credential });
    return res.data.data; // { user: { user_id, full_name, email, role } }
  } catch (error) {
    return { error: error.response?.data?.message || "Google login failed" };
  }
};

export const logoutRequest = async () => {
  try {
    await api.post("/auth/logout");
  } catch {
    // always clear local state even if the request fails
  }
};
