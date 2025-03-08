import React from 'react';
import { Link } from 'react-router-dom';

function DecryptPage() {
  return (
    <div>
      <h1>Decrypt</h1>
      <nav>
        <Link to="/decrypt/text">
          <button>Text</button>
        </Link>
        <Link to="/decrypt/image">
          <button>Image</button>
        </Link>
        <Link to="/decrypt/audio">
          <button>Audio</button>
        </Link>
        <Link to="/decrypt/video">
          <button>Video</button>
        </Link>
      </nav>
    </div>
  );
}

export default DecryptPage;