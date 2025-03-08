import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

function TextDecrypt() {
  const [encryptedText, setEncryptedText] = useState('');
  const [decryptionKey, setDecryptionKey] = useState('');
  const [decryptedText, setDecryptedText] = useState('');

  const handleDecrypt = () => {
    if (!encryptedText || !decryptionKey) {
      alert('Please enter both encrypted text and decryption key.');
      return;
    }

    // Decrypt the encrypted text using AES decryption
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedText, decryptionKey);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      setDecryptedText(decrypted);
    } catch (error) {
      alert('Decryption failed. Please check your decryption key.');
    }
  };

  return (
    <div>
      <h2>Text Decryption</h2>
      <div>
        <label htmlFor="encryptedText">Encrypted Text:</label>
        <textarea
          id="encryptedText"
          placeholder="Enter encrypted text"
          value={encryptedText}
          onChange={(e) => setEncryptedText(e.target.value)}
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