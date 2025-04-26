import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { validateUser } from "../Users";
import "./login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const loginTime = localStorage.getItem("loginTime");
    if (loginTime) {
      const elapsedTime = Date.now() - parseInt(loginTime, 10);
      if (elapsedTime < 30 * 60 * 1000) {
        // 30 minutes
        navigate("/select"); // Redirect if session is still valid
      } else {
        localStorage.removeItem("loginTime"); // Clear expired session
      }
    }
  }, [navigate]);

  const handleLogin = () => {
    if (username && password) {
      setIsLoading(true);
      setTimeout(() => {
        if (validateUser(username, password)) {
          localStorage.setItem("loginTime", Date.now()); // Save login timestamp
          navigate("/select");
          setTimeout(() => {
            localStorage.removeItem("loginTime"); // Auto logout after 30 minutes
            alert("Session expired. Please log in again.");
            navigate("/");
          }, 30 * 60 * 1000); // 30 minutes timeout
        } else {
          alert("Invalid username or password. Please try again.");
        }
        setIsLoading(false);
      }, 1000);
    } else {
      alert("Please enter username and password");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Please enter your credentials</p>

        <div className="input-group">
          <input
            type="text"
            placeholder="Username"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>

        <button
          className="login-button"
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </button>

        <div className="login-footer">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="signup-link">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
