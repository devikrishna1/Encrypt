import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

function VideoEncrypt() {
  const [videoFile, setVideoFile] = useState(null);
  const [encryptionKey, setEncryptionKey] = useState('');
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [status, setStatus] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      setStatus('');
    } else {
      setStatus('Please select a valid video file');
    }
  };

  const handleEncrypt = () => {
    if (!videoFile || !encryptionKey) {
      setStatus('Please select a video and enter encryption key');
      return;
    }

    setIsEncrypting(true);
    setStatus('Encrypting...');

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const videoData = event.target.result;
        const timestamp = Date.now();
        const dynamicKey = `${encryptionKey}-${timestamp}`;

        // Encrypt video data
        const encrypted = CryptoJS.AES.encrypt(videoData, dynamicKey).toString();

        // Create encrypted package
        const encryptedPackage = JSON.stringify({
          encrypted,
          timestamp,
          fileType: videoFile.type,
          originalName: videoFile.name
        });

        // Download encrypted file
        const blob = new Blob([encryptedPackage], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${videoFile.name}.enc`;
        a.click();
        URL.revokeObjectURL(url);

        setStatus('Encryption successful!');
      } catch (error) {
        setStatus('Encryption failed: ' + error.message);
      } finally {
        setIsEncrypting(false);
      }
    };
    reader.onerror = () => {
      setStatus('File reading failed');
      setIsEncrypting(false);
    };
    reader.readAsDataURL(videoFile);
  };

  return (
    <div className="video-encrypt-container">
      <h2>Video Encryption</h2>
      <div className="file-section">
        <label>
          Select Video File:
          <input 
            type="file" 
            accept="video/*" 
            onChange={handleFileChange}
            disabled={isEncrypting}
          />
        </label>
        {videoFile && (
          <div className="file-info">
            Selected: {videoFile.name} ({Math.round(videoFile.size/1024)} KB)
          </div>
        )}
      </div>
      
      <div className="key-section">
        <label>
          Encryption Key:
          <input
            type="password"
            value={encryptionKey}
            onChange={(e) => setEncryptionKey(e.target.value)}
            placeholder="Enter secret key"
            disabled={isEncrypting}
          />
        </label>
      </div>
      
      <button 
        onClick={handleEncrypt}
        disabled={isEncrypting || !videoFile || !encryptionKey}
      >
        {isEncrypting ? 'Encrypting...' : 'Encrypt Video'}
      </button>
      
      {status && <div className={`status ${status.includes('failed') ? 'error' : 'success'}`}>{status}</div>}
      
      
    </div>
  );
}

export default VideoEncrypt;