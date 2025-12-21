// import { data, Link, useNavigate, useLocation } from "react-router-dom";
// import React, { useEffect, useState } from "react";
// import { useAuth } from "../context/AuthContext";


// export default function Login() {  
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//     const { login } = useAuth();
//     const navigate = useNavigate(); 
//     const location = useLocation();

  
//   const from = location.state?.from?.pathname || "/checkout";

//   const handleLogin = async () => {
//     try {
//       const res = await login(email, password);

//       if (res.token) {
//         navigate(from, { replace: true }); 
//       } else {
//         setError(res.error || "Login failed");
//       }
//     } catch (err) {
//       setError("Something went wrong");
//     }
//   };





//     return (

//       <>

//       <div className="login-register">
//         <button></button>
//       </div>
   
//         <div className="login-container">
            
//             <div className="login-content">
//             <h2 className="login-title">Login</h2>
//             {error && <p style={{ color: "red" }}>{error}</p>}
//             <input type="text" 
//               placeholder="Email" 
//               className="login-input" 
//               value={email}
//               onChange={(e) => setEmail(e.target.value)} required>
//             </input>
            
//             <input 
//               type="password" 
//               placeholder="Password" 
//               className="login-input" 
//               value={password}
//               onChange={(e) => setPassword(e.target.value)} required>
//             </input>
            
//             <p>Forgot password?</p>
//             <p>Don't have an account?<Link to="/Register" className="register-link">Register</Link></p>
           
//             <button onClick={handleLogin} className="login-btn">Login</button>
//         </div> 
//         </div>
//     </>



//   );
// }

import React, { useState } from "react";
import "../auth.css"; // Make sure to create this CSS file

export default function AuthCard() {
  const [isLogin, setIsLogin] = useState(true);

  const handleGoogleLogin = () => {
    // Placeholder for Google OAuth logic
    console.log("Google login clicked");
  };

  const handleFacebookLogin = () => {
    // Placeholder for Facebook OAuth logic
    console.log("Facebook login clicked");
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
              <input type="email" placeholder="Email Address" />
              <input type="password" placeholder="Password" />
              <button className="submit-btn">Sign In</button>

              {/* Social login buttons */}
              <p className="continue-with">or continue with</p>
              <div className="social-login">
                <button className="google-btn" onClick={handleGoogleLogin}>
                  <img src="/google-icon.png" alt="Google" className="icon" />
                  Google
                </button>
                <button className="facebook-btn" onClick={handleFacebookLogin}>
                  <img src="/facebook-icon.png" alt="Facebook" className="icon" />
                  Facebook
                </button>
              </div>
            </div>
          ) : (
            <div className="form">
              <h2>Create Account</h2>
              <input type="text" placeholder="Full Name" />
              <input type="email" placeholder="Email Address" />
              <input type="password" placeholder="Password" />
              <button className="submit-btn">Register</button>

              {/* Social login buttons */}
              <p className="continue-with">or continue with</p>
              <div className="social-login">
                <button className="google-btn" onClick={handleGoogleLogin}>
                  <img src="/google-icon.png" alt="Google" className="icon" />
                  Google
                </button>
                <button className="facebook-btn" onClick={handleFacebookLogin}>
                  <img src="/facebook-icon.png" alt="Facebook" className="icon" />
                  Facebook
                </button>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}

