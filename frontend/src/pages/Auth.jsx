import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
      if (res?.user) {
        navigate("/");
      } else {
        setError(res?.error || "Google login failed");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      const res = await login(email, password);
      if (res?.user) {
        navigate("/");
      } else {
        setError(res?.error || "Login failed");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      const res = await register(fullName, email, password);
      if (res?.user) {
        navigate("/");
      } else {
        setError(res?.error || "Registration failed");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Link to="/" className="back-button">
        &larr; Back to home
      </Link>
      <div className="auth-card">
        {/* Tab toggle */}
        <div className="tab-toggle">
          <button
            type="button"
            className={`tab ${isLogin ? "active" : ""}`}
            onClick={() => { setIsLogin(true); setError(""); }}
            disabled={loading || googleLoading}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`tab ${!isLogin ? "active" : ""}`}
            onClick={() => { setIsLogin(false); setError(""); }}
            disabled={loading || googleLoading}
          >
            Register
          </button>
        </div>

        {/* Card content */}
        <div className={`form-container ${isLogin ? "slide-in" : "slide-out"}`}>
          {isLogin ? (
            <form className="form" onSubmit={handleLogin} noValidate>
              <h2>Welcome Back</h2>
              {error && <p role="alert" style={{ color: "red" }}>{error}</p>}
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                disabled={loading}
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                disabled={loading}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </button>

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
            </form>
          ) : (
            <form className="form" onSubmit={handleRegister} noValidate>
              <h2>Create Account</h2>
              {error && <p role="alert" style={{ color: "red" }}>{error}</p>}
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                disabled={loading}
                autoComplete="name"
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                disabled={loading}
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password (min 8 characters)"
                value={password}
                disabled={loading}
                autoComplete="new-password"
                minLength={8}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Creating account..." : "Register"}
              </button>

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
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
