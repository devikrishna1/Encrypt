import React from 'react';
import { Link } from 'react-router-dom';
import './EncryptPage.css';

function EncryptPage() {
  return (
    <div className="encrypt-container">
      <h1>Encrypt</h1>
      <nav>
        <Link to="/encrypt/text">
          <button className="encrypt-button">Text</button>
        </Link>
        <Link to="/encrypt/image">
          <button className="encrypt-button">Image</button>
        </Link>
        <Link to="/encrypt/audio">
          <button className="encrypt-button">Audio</button>
        </Link>
        <Link to="/encrypt/video">
          <button className="encrypt-button">Video</button>
        </Link>
      </nav>
    </div>
  );
}

export default EncryptPage;
