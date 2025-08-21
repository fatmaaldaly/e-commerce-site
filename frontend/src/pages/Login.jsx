import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useState } from "react";
import axios from "axios";



export default function Login() {  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // 👈 initialize


   const handleLogin = async (e) => {
      e.preventDefault();
      try{
        const res = await axios.post("http://localhost:5000/api/login", {email, password}, { headers: { "Content-Type": "application/json" } });
        localStorage.setItem("token", res.data.token); // save jwt
        alert("login successfull")
        setError("")
        navigate("/");

      }catch(err){
        setError(err.response?.data?.error);

      }
    };


    return (
        <div className="login-container">
            
            <div className="login-content">
            <h2 className="login-title">Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input type="text" 
              placeholder="Email" 
              className="login-input" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} required>
            </input>
            
            <input 
              type="password" 
              placeholder="Password" 
              className="login-input" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} required>
            </input>
            
            <p>Forgot password?</p>
            <p>Don't have an account?<Link to="/Register" className="register-link">Register</Link></p>
           
            <button onClick={handleLogin} className="login-btn">Login</button>
        </div> 
        </div>
    
    
   

  );
}

