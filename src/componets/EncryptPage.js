import React from 'react';
import { Link } from 'react-router-dom';

function EncryptPage() {
  return (
    <div>
      <h1>Encrypt</h1>
      <nav>
        <Link to="/encrypt/text">
          <button>Text</button>
        </Link>
        <Link to="/encrypt/image">
          <button>Image</button>
        </Link>
        <Link to="/encrypt/audio">
          <button>Audio</button>
        </Link>
        <Link to="/encrypt/video">
          <button>Video</button>
        </Link>
      </nav>
    </div>
  );
}

export default EncryptPage;