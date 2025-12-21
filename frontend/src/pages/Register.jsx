import {useState} from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from "../context/AuthContext";


export default function Register(){
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { register } = useAuth();
    const location = useLocation();


    
  const from = location.state?.from?.pathname || "/checkout";

  const handleRegister = async () => {
    try {
      const res = await register(fullName, email, password);

      if (res.token) {
        navigate(from, { replace: true }); 
      } else {
        setError(res.error || "Registration failed");
      }
    } catch (err) {
      setError("Something went wrong");
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
