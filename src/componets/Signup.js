import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { addUser } from '../Users';
import './signup.css';

function Signup() {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = () => {
    if (username && name && password && email) {
      setIsLoading(true);
      setTimeout(() => {
        const newUser = { username, name, password, email };
        addUser(newUser);
        alert('Account created successfully! Please login.');
        navigate('/');
        setIsLoading(false);
      }, 1000);
    } else {
      alert('Please fill all fields');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSignup();
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1 className="signup-title">Create Account</h1>
        <p className="signup-subtitle">Join us today!</p>
        
        <div className="input-group">
          <input
            type="text"
            placeholder="Username"
            className="signup-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        
        <div className="input-group">
          <input
            type="text"
            placeholder="Full Name"
            className="signup-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        
        <div className="input-group">
          <input
            type="email"
            placeholder="Email Address"
            className="signup-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            className="signup-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        
        <button 
          className="signup-button"
          onClick={handleSignup}
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Sign Up'}
        </button>
        
        <div className="signup-footer">
          <p>Already have an account? <Link to="/" className="login-link">Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Signup;