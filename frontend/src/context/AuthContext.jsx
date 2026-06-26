// Creates a global state container for authentication.

import { createContext, useState } from "react";
import {loginRequest, registerRequest, googleLoginRequest} 
from "../services/authService";


const AuthContext = createContext();

// this wraps your app, everything inside gets access to the auth context
export const AuthProvider = ({ children }) => {
  // gets token from localStorage on first render, this keeps user logged in after refresh
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [userId, setUserId] = useState(() =>localStorage.getItem("user_id"));

  // updates react state and saves data in localstorage
  const saveAuth = (token, userId) => {
    // React state → for UI updates
    setToken(token); 
    setUserId(userId);
    // localStorage → for persistence
    localStorage.setItem("token", token);
    localStorage.setItem("user_id", userId);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    window.location.href = "/login";
  };

  const login = async (email, password) => {
    // calls api
    const data = await loginRequest(email, password);
    
    if (data.token) {
      saveAuth(data.token, data.user.user_id);
    }

    return data;
  };

  const register = async (fullName, email, password) => {
    const data = await registerRequest(fullName, email, password);

    if (data.token) {
      saveAuth(data.token, data.user.user_id);
    }

    return data;
  };

  const googleLogin = async (credential) => {
  const data = await googleLoginRequest(credential);

  if (data.token) {
    saveAuth(data.token, data.user.user_id);
  }

  return data;
};

  return (
    <AuthContext.Provider
      value={{ token, userId, login, register, googleLogin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;