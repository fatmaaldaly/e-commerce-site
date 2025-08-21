import {useState} from "react";
import axios from "axios";
import '../style.css'
import { Link } from 'react-router-dom'




export default function Register(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    const handleRegister= async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post("http://localhost:5000/api/register", {email, password})
            alert("user registered successfully");
            setError("");

        }catch(err){
             setError(err.response?.data?.error);

        }
    };




    return(
         <div className="login-container">
            <div className="login-content">
            <h2 className="login-title">Register</h2>
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
           
            <p>Already have an account?<Link to="/Login" className="register-link">Login</Link></p>
            <button onClick={handleRegister} className="login-btn">Register</button>
        </div> 
        </div>

    );

    
}