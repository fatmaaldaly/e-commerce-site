import { data, Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useState } from "react";
import NavBar from "../components/NavBar";


export default function Login() {  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); 


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // token is saved locally in the browser, so the user can stay logged in.
        localStorage.setItem("token", data.token); 
        navigate("/"); 
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong!");
    }
  };



    return (
      // <div >
      //  <NavBar />
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
    

  //  </div>

  );
}

