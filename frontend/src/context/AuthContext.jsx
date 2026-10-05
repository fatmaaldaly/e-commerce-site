import { createContext, useState } from "react";
import { loginRequest, registerRequest, googleLoginRequest, logoutRequest }
  from "../services/authService";

const AuthContext = createContext();

const getStoredUser = () => {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser);

  const saveUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const login = async (email, password) => {
    const data = await loginRequest(email, password);
    if (data.user) saveUser(data.user);
    return data;
  };

  const register = async (fullName, email, password) => {
    const data = await registerRequest(fullName, email, password);
    if (data.user) saveUser(data.user);
    return data;
  };

  const googleLogin = async (credential) => {
    const data = await googleLoginRequest(credential);
    if (data.user) saveUser(data.user);
    return data;
  };

  const logout = async () => {
    await logoutRequest();
    clearUser();
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        googleLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
