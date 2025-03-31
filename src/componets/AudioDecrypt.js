import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import './EncryptUi.css';

function AudioDecrypt() {
  const [encryptedFile, setEncryptedFile] = useState(null);
  const [decryptionKey, setDecryptionKey] = useState('');
  const [decryptedAudio, setDecryptedAudio] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setEncryptedFile(e.target.files[0]);
    setError('');
  };

  const handleDecrypt = () => {
    if (!encryptedFile || !decryptionKey) {
      setError('Please upload file and enter decryption key');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const { encrypted, timestamp, fileType } = JSON.parse(event.target.result);
        
        // 2-minute expiry validation
        if (Date.now() - timestamp > 120000) {
          setError('File expired - must decrypt within 2 minutes');
          return;
        }

        const dynamicKey = `${decryptionKey}-${timestamp}`;
        const bytes = CryptoJS.AES.decrypt(encrypted, dynamicKey);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);

        if (!decrypted) {
          setError('Decryption failed - wrong key?');
          return;
        }

        setDecryptedAudio(decrypted);
      } catch (err) {
        setError('Invalid encrypted file format');
      }
    };
    reader.readAsText(encryptedFile);
  };

  return (
    <div className="decryption-container">
      <h2>Audio Decryption</h2>
      <div className="file-input">
        <label>Upload Encrypted File:</label>
        <input type="file" accept=".enc" onChange={handleFileChange} />
      </div>
      <div className="key-input">
        <label>Decryption Key:</label>
        <input
          type="password"
          value={decryptionKey}
          onChange={(e) => setDecryptionKey(e.target.value)}
          placeholder="Enter secret key"
        />
      </div>
      <button onClick={handleDecrypt}>Decrypt Audio</button>
      
      {error && <div className="error">{error}</div>}
      
      {decryptedAudio && (
        <div className="audio-preview">
          <h3>Decrypted Audio:</h3>
          <audio controls src={decryptedAudio} />
          <a 
            href={decryptedAudio} 
            download={`decrypted_audio.${decryptedAudio.split(';')[0].split('/')[1]}`}
            className="download-btn"
          >
            Download Audio
          </a>
        </div>
      )}
    </div>
  );
}

export default AudioDecrypt;