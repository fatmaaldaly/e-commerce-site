// api layer for communication with backend
import api from "../lib/api";


export const registerRequest = async (fullName, email, password) => {
  try{
    const res = await api.post("/auth/register", {
      fullName,
      email,
      password,
    });
    return res.data;
  
  }catch(error){
    return {
      error: error.response?.data?.error || "Registration failed",
    };
  }
}


export const loginRequest = async (email, password) => {
  try{
    const res = await api.post("/auth/login", {
      email, 
      password,
    });
    return res.data;
  
  }catch(error){
    return {
      error: error.response?.data?.error || "Login failed",
    };
  }
}