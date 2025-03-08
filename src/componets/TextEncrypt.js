import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

function TextEncrypt() {
  const [plainText, setPlainText] = useState('');
  const [encryptionKey, setEncryptionKey] = useState('');
  const [encryptedText, setEncryptedText] = useState('');

  const handleEncrypt = () => {
    if (!plainText || !encryptionKey) {
      alert('Please enter both plain text and encryption key.');
      return;
    }

    // Encrypt the plain text using AES encryption
    const encrypted = CryptoJS.AES.encrypt(plainText, encryptionKey).toString();
    setEncryptedText(encrypted);

    // Create a downloadable file
    const blob = new Blob([encrypted], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'encrypted_message.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h2>Text Encryption</h2>
      <div>
        <label htmlFor="plainText">Plain Text:</label>
        <textarea
          id="plainText"
          placeholder="Enter plain text"
          value={plainText}
          onChange={(e) => setPlainText(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="encryptionKey">Encryption Key:</label>
        <input
          type="text"
          id="encryptionKey"
          placeholder="Enter encryption key"
          value={encryptionKey}
          onChange={(e) => setEncryptionKey(e.target.value)}
        />
      </div>
      <button onClick={handleEncrypt}>Encrypt</button>
      {encryptedText && (
        <div>
          <h3>Encrypted Message:</h3>
          <textarea
            readOnly
            value={encryptedText}
            placeholder="Encrypted message will appear here"
          />
        </div>
      )}
    </div>
  );
}

export default TextEncrypt;