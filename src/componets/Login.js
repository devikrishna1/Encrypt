import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { validateUser } from '../Users';
import './login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username && password) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        if (validateUser(username, password)) {
          navigate('/main');
        } else {
          alert('Invalid username or password. Please try again or create an account.');
        }
        setIsLoading(false);
      }, 1000);
    } else {
      alert('Please enter username and password');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
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
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
        
        <div className="login-footer">
          <p>Don't have an account? <Link to="/signup" className="signup-link">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;