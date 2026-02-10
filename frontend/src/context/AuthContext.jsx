import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
 

  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [userId, setUserId] = useState(() => localStorage.getItem("user_id"));
  const [redirectTo, setRedirectTo] = useState(null);
  
  
  // Save auth data
  const saveAuthData = (token, user_id) => {
    setToken(token);
    setUserId(user_id);
    localStorage.setItem("token", token);
    localStorage.setItem("user_id", user_id);
  };

  // Logout
  const logout = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    setRedirectTo(null);
  };


  // Login
  const login = async (email, password) => {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.token) {
      saveAuthData(data.token, data.user.id);
    }

    return data;
  };


  // Register
  const register = async (fullName, email, password) => {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, email, password }),
    });

    const data = await res.json();

    if (data.token) {
      saveAuthData(data.token, data.user.id);
    }

    return data;
  };


  // Authenticated fetch
  const authFetch = async (url, options = {}) => {
    if (!token) throw new Error("No token");

    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...(options.headers || {}),
      },
    });

    if (res.status === 401) {
      logout();
      throw new Error("Unauthorized");
    }

    return res;
  };



  return (
    <AuthContext.Provider
      value={{ token, userId, login, register, logout, authFetch, redirectTo, setRedirectTo}}
    >
      {children}
    </AuthContext.Provider>
  );
};
