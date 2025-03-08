import './ImageEncrypt.css';
import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

function ImageDecrypt() {
  const [encryptedImage, setEncryptedImage] = useState('');
  const [decryptionKey, setDecryptionKey] = useState('');
  const [decryptedImage, setDecryptedImage] = useState(null);

  const handleDecrypt = () => {
    if (!encryptedImage || !decryptionKey) {
      alert('Please enter encrypted image data and decryption key.');
      return;
    }

    try {
      const bytes = CryptoJS.AES.decrypt(encryptedImage, decryptionKey);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);

      if (!decrypted) {
        throw new Error('Decryption failed. Please check your decryption key.');
      }

      setDecryptedImage(decrypted);
    } catch (error) {
      console.error('Decryption error:', error);
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Image Decryption</h2>
      <div>
        <label htmlFor="encryptedImage">Encrypted Image Data:</label>
        <textarea
          id="encryptedImage"
          placeholder="Enter encrypted image data"
          value={encryptedImage}
          onChange={(e) => setEncryptedImage(e.target.value)}
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
      {decryptedImage && (
        <div>
          <h3>Decrypted Image:</h3>
          <img src={decryptedImage} alt="Decrypted" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
}

export default ImageDecrypt;