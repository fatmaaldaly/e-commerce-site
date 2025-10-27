import {useState} from "react";
import { Link, useNavigate } from 'react-router-dom'
import NavBar from "../components/NavBar";


export default function Register(){
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        // tells the backend the data im sending is in json format, So the backend knows it should parse the request body as JSON, not as plain text
        headers: {
          "Content-Type": "application/json",
        },

        
        // converts a JavaScript object to a json string, sends data in this format to backend
        body: JSON.stringify({
          fullName: fullName,  
          email: email,
          password: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      localStorage.setItem("token", data.token); 
      navigate("/");
      setError("");

    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message || "Something went wrong");
    }
  };





    return(
       
         <div className="login-container">
        
            <div className="login-content">
            <h2 className="login-title">Register</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input type="text" 
              placeholder="Full name" 
              className="login-input" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)} required>
            </input>
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
           
            <p>Already have an account?<Link to="/Login" className="register-link">Login</Link></p>
            <button onClick={handleRegister} className="login-btn">Register</button>
        </div> 
        </div>

    );

    
}