import React from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';

function MainPage() {
  return (
    <div className="container">
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
