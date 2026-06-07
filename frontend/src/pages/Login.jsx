import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { GoogleLogin } from '@react-oauth/google';
import "../auth.css"; 

export default function AuthCard() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, register} = useAuth();
  
  const handleGoogleLogin = (credentialResponse) => {
    const token = credentialResponse.credential;
    // Send token to backend to verify or create user
    console.log("Google token:", token);
  };




  const handleLogin = async () => {
    try {
      setError("");
      const res = await login(email, password);
      
      if (res.token) {
        navigate("/");
      } else {
        setError(res.error || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong", err.message);
    }
  };

  const handleRegister = async () => {
    try {
      setError("");
      const res = await register(fullName, email, password);
      
      if (res.token) {
        navigate("/");
      } else {
        setError(res.error || "Registration failed");
      }
    } catch (err) {
      setError("Something went wrong", err.message);
    }
  };
  
  return (
    <div className="auth-page">
      <button className="back-button" onClick={() => window.history.back()}>
        &larr; Back to home
      </button>
      <div className="auth-card">
        {/* Tab toggle */}
        <div className="tab-toggle">
          <button
            className={`tab ${isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(true)}
            
          >
            Sign In
          </button>
          <button
            className={`tab ${!isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        {/* Card content */}
        <div className={`form-container ${isLogin ? "slide-in" : "slide-out"}`}>
          {isLogin ? (
            <div className="form">
              <h2>Welcome Back</h2>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <input 
                type="email" 
                placeholder="Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input 
                type="password" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="submit-btn" onClick={handleLogin}>Sign In</button>

              {/* Social login buttons */}
              <p className="continue-with">or continue with</p>
              <div className="social-login">
                {/* <button className="google-btn" onClick={handleGoogleLogin}>
                  <img src="/google-icon.png" alt="Google" className="icon" />
                  Google
                </button> */}
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => setError("Google login failed")}
                />

              </div>
            </div>
          ) : (
            <div className="form">
              <h2>Create Account</h2>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <input 
                type="text" 
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <input 
                type="email" 
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input 
                type="password" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="submit-btn" onClick={handleRegister}>Register</button>

              {/* Social login buttons */}
              <p className="continue-with">or continue with</p>
              <div className="social-login">
                <button className="google-btn" onClick={handleGoogleLogin}>
                  <img src="/google-icon.png" alt="Google" className="icon" />
                  Google
                </button>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}

