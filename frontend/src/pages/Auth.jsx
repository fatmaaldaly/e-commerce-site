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
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const { login, register, googleLogin } = useAuth();
  
   const handleGoogleLogin = async (credentialResponse) => {
   try {
     setError("");
     setGoogleLoading(true);
 
     const res = await googleLogin(credentialResponse.credential);
 
     if (res.token) {
       navigate("/");
     } else {
       setError(res.error || "Google login failed");
     }
   } catch (err) {
     setError(err.message || "Something went wrong");
   
    }finally {
      setGoogleLoading(false);
    }
 };



  const handleLogin = async () => {
    try {
      setError("");
      setLoading(true);
      const res = await login(email, password);
      console.log("Result:", res);
      if (res.token) {
        navigate("/");
      } else {
        setError(res.error || "Login failed");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    }finally {
      setLoading(false);
    }
  };


  const handleRegister = async () => {
    try {
      setError("");
      setLoading(true);
      const res = await register(fullName, email, password);
      
      if (res.token) {
        navigate("/");
      } else {
        setError(res.error || "Registration failed");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    }finally {
      setLoading(false);
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
            disabled={loading || googleLoading}
          >
            Sign In
          </button>
          <button
            className={`tab ${!isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(false)}
            disabled={loading || googleLoading}
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
                disabled={loading}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input 
                type="password" 
                placeholder="Password"
                value={password}
                disabled={loading}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="submit-btn" onClick={handleLogin} disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </button>

              {/* Social login buttons */}
              <p className="continue-with">or continue with</p>
              <div className="social-login">
                {googleLoading ? (
                  <p>Loading Google...</p>
                ) : (
                  <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={() => setError("Google login failed")}
                  />
                )}

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
                disabled={loading}
                onChange={(e) => setFullName(e.target.value)}
              />
              <input 
                type="email" 
                placeholder="Email Address"
                value={email}
                disabled={loading}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input 
                type="password" 
                placeholder="Password"
                value={password}
                disabled={loading}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="submit-btn" onClick={handleRegister} disabled={loading}>
                 {loading ? "Creating account..." : "Register"}
              </button>

              {/* Social login buttons */}
              <p className="continue-with">or continue with</p>
              <div className="social-login">
                {googleLoading ? (
                  <p>Loading Google...</p>
                ) : (
                  <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={() => setError("Google login failed")}
                  />
                )}
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}

