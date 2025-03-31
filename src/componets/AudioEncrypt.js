import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import './EncryptUi.css';

function AudioEncrypt() {
  const [audioFile, setAudioFile] = useState(null);
  const [encryptionKey, setEncryptionKey] = useState('');
  const [encryptedData, setEncryptedData] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioFile(file);
    }
  };

  const handleEncrypt = () => {
    if (!audioFile || !encryptionKey) {
      alert('Please select an audio file and enter an encryption key.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const audioData = event.target.result; // Base64 encoded audio
      const timestamp = Date.now(); // Current timestamp
      const dynamicKey = `${encryptionKey}-${timestamp}`; // Combine key + timestamp

      // Encrypt with AES
      const encrypted = CryptoJS.AES.encrypt(audioData, dynamicKey).toString();
      setEncryptedData(encrypted);

      // Create downloadable file
      const fileContent = JSON.stringify({ 
        encrypted, 
        timestamp,
        fileType: audioFile.type // Store original file type
      });
      
      const blob = new Blob([fileContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'encrypted_audio.enc';
      a.click();
      URL.revokeObjectURL(url);
    };
    reader.readAsDataURL(audioFile);
  };

  return (
    <div className="encryption-container">
      <h2>Audio Encryption</h2>
      <div className="file-input">
        <label>Select Audio File:</label>
        <input type="file" accept="audio/*" onChange={handleFileChange} />
      </div>
      <div className="key-input">
        <label>Encryption Key:</label>
        <input
          type="password"
          value={encryptionKey}
          onChange={(e) => setEncryptionKey(e.target.value)}
          placeholder="Enter secret key"
        />
      </div>
      <button onClick={handleEncrypt}>Encrypt Audio</button>
      
      {encryptedData && (
        <div className="result">
          <h3>Encryption Successful!</h3>
          <p>File has been downloaded as encrypted_audio.enc</p>
        </div>
      )}
    </div>
  );
}

export default AudioEncrypt;