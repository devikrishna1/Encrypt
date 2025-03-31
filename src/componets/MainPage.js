import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './MainPage.css';

function MainPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('loginTime'); // Clear session
    navigate('/'); // Redirect to login page
  };

  return (
    <div className="container">
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <h1>Welcome to the Main Page</h1>
      <nav>
        <Link to="/encrypt">
          <button className="nav-button">Encrypt</button>
        </Link>
        <Link to="/decrypt">
          <button className="nav-button">Decrypt</button>
        </Link>
      </nav>
    </div>
  );
}

export default MainPage;
