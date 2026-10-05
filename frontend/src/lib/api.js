import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true, // sends the httpOnly auth cookie on every request
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    // A 401 from login/register just means wrong credentials: let the form show
    // the error. For anything else, the session expired, so send the user to log in.
    const isAuthRequest = err.config?.url?.startsWith("/auth/");
    if (err.response?.status === 401 && !isAuthRequest) {
      localStorage.removeItem("user");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  }
);

// Backend errors look like { success: false, message: "..." }
export const getErrorMessage = (err, fallback) =>
  err?.response?.data?.message || fallback;

export default api;
