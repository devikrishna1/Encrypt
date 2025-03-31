import React from 'react';
import { Link } from 'react-router-dom';
import './DecryptPage.css';

function DecryptPage() {
  return (
    <div className="decrypt-container">
      <h1>Decrypt</h1>
      <nav>
        <Link to="/decrypt/text">
          <button className="decrypt-button">Text</button>
        </Link>
        <Link to="/decrypt/image">
          <button className="decrypt-button">Image</button>
        </Link>
        <Link to="/decrypt/audio">
          <button className="decrypt-button">Audio</button>
        </Link>
        <Link to="/decrypt/video">
          <button className="decrypt-button">Video</button>
        </Link>
      </nav>
    </div>
  );
}

export default DecryptPage;