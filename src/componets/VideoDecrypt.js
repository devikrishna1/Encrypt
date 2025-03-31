import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

function VideoDecrypt() {
  const [encryptedFile, setEncryptedFile] = useState(null);
  const [decryptionKey, setDecryptionKey] = useState('');
  const [decryptedVideo, setDecryptedVideo] = useState('');
  const [status, setStatus] = useState('');
  const [isDecrypting, setIsDecrypting] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith('.enc')) {
      setEncryptedFile(file);
      setStatus('');
    } else {
      setStatus('Please select a valid .enc file');
    }
  };

  const handleDecrypt = () => {
    if (!encryptedFile || !decryptionKey) {
      setStatus('Please select a file and enter decryption key');
      return;
    }

    setIsDecrypting(true);
    setStatus('Decrypting...');

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const { encrypted, timestamp, fileType, originalName } = JSON.parse(event.target.result);

        // Check if expired (2 minutes)
        if (Date.now() - timestamp > 120000) {
          setStatus('Error: File expired (must decrypt within 2 minutes)');
          setIsDecrypting(false);
          return;
        }

        const dynamicKey = `${decryptionKey}-${timestamp}`;
        const bytes = CryptoJS.AES.decrypt(encrypted, dynamicKey);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);

        if (!decrypted) {
          setStatus('Decryption failed - wrong key?');
          setIsDecrypting(false);
          return;
        }

        setDecryptedVideo(decrypted);
        setStatus(`Successfully decrypted ${originalName}`);
      } catch (error) {
        setStatus('Decryption failed: ' + error.message);
      } finally {
        setIsDecrypting(false);
      }
    };
    reader.onerror = () => {
      setStatus('File reading failed');
      setIsDecrypting(false);
    };
    reader.readAsText(encryptedFile);
  };

  return (
    <div className="video-decrypt-container">
      <h2>Video Decryption</h2>
      <div className="file-section">
        <label>
          Upload Encrypted File (.enc):
          <input 
            type="file" 
            accept=".enc" 
            onChange={handleFileChange}
            disabled={isDecrypting}
          />
        </label>
      </div>
      
      <div className="key-section">
        <label>
          Decryption Key:
          <input
            type="password"
            value={decryptionKey}
            onChange={(e) => setDecryptionKey(e.target.value)}
            placeholder="Enter secret key"
            disabled={isDecrypting}
          />
        </label>
      </div>
      
      <button 
        onClick={handleDecrypt}
        disabled={isDecrypting || !encryptedFile || !decryptionKey}
      >
        {isDecrypting ? 'Decrypting...' : 'Decrypt Video'}
      </button>
      
      {status && <div className={`status ${status.includes('failed') || status.includes('Error') ? 'error' : 'success'}`}>{status}</div>}
      
      {decryptedVideo && (
        <div className="video-preview">
          <h3>Decrypted Video Preview:</h3>
          <video controls src={decryptedVideo} style={{ maxWidth: '100%' }} />
          <a
            href={decryptedVideo}
            download={`decrypted_${encryptedFile.name.replace('.enc', '')}`}
            className="download-btn"
          >
            Download Video
          </a>
        </div>
      )}
      
  
    </div>
  );
}

export default VideoDecrypt;