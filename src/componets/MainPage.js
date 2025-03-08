import React from 'react';
import { Link } from 'react-router-dom';

function MainPage() {
  return (
    <div>
      <h1>Welcome to the Main Page</h1>
      <nav>
        <Link to="/encrypt">
          <button>Encrypt</button>
        </Link>
        <Link to="/decrypt">
          <button>Decrypt</button>
        </Link>
      </nav>
    </div>
  );
}

export default MainPage;