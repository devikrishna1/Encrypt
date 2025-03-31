import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import './EncryptUi.css';

function TextDecrypt() {
  const [encryptedFile, setEncryptedFile] = useState(null);
  const [decryptionKey, setDecryptionKey] = useState('');
  const [decryptedText, setDecryptedText] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEncryptedFile(file);
    }
  };

  const handleDecrypt = () => {
    if (!encryptedFile || !decryptionKey) {
      alert('Please upload an encrypted file and enter the decryption key.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const fileContent = event.target.result; // Read the file content
      const { encrypted, timestamp } = JSON.parse(fileContent); // Parse encrypted data and timestamp

      // Define the time window (2 minutes in milliseconds)
      const timeWindow = 2 * 60 * 1000; // 2 minutes

      // Check if the current time is within the time window
      const currentTime = Date.now();
      if (currentTime - timestamp > timeWindow) {
        alert('Decryption failed. The encrypted data has expired (2-minute limit).');
        return;
      }

      // Combine the decryption key with the timestamp
      const dynamicKey = `${decryptionKey}-${timestamp}`;

      // Decrypt the text using AES decryption with the dynamic key
      const bytes = CryptoJS.AES.decrypt(encrypted, dynamicKey);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);

      if (!decrypted) {
        alert('Decryption failed. Please check your decryption key.');
        return;
      }

      setDecryptedText(decrypted);
    };
    reader.readAsText(encryptedFile); // Read the file as text
  };

  return (
    <div>
      <h2>Text Decryption</h2>
      <div>
        <label htmlFor="encryptedFile">Upload Encrypted File:</label>
        <input
          type="file"
          id="encryptedFile"
          accept=".txt"
          onChange={handleFileChange}
        />
      </div>
      <div>
        <label htmlFor="decryptionKey">Decryption Key:</label>
        <input
          type="text"
          id="decryptionKey"
          placeholder="Enter decryption key"
          value={decryptionKey}
          onChange={(e) => setDecryptionKey(e.target.value)}
        />
      </div>
      <button onClick={handleDecrypt}>Decrypt</button>
      {decryptedText && (
        <div>
          <h3>Decrypted Message:</h3>
          <textarea
            readOnly
            value={decryptedText}
            placeholder="Decrypted message will appear here"
          />
        </div>
      )}
    </div>
  );
}

export default TextDecrypt;