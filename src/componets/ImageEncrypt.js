import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import './EncryptUi.css';


function ImageEncrypt() {
  const [imageFile, setImageFile] = useState(null);
  const [encryptionKey, setEncryptionKey] = useState('');
  const [encryptedText, setEncryptedText] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleEncrypt = () => {
    if (!imageFile || !encryptionKey) {
      alert('Please select an image and enter an encryption key.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageData = event.target.result; // Base64 encoded image

      // Get the current timestamp
      const timestamp = Date.now(); // Current timestamp in milliseconds
      const dynamicKey = `${encryptionKey}-${timestamp}`; // Combine key and timestamp

      // Encrypt the image data using AES encryption with the dynamic key
      const encrypted = CryptoJS.AES.encrypt(imageData, dynamicKey).toString();
      setEncryptedText(encrypted);

      // Create a downloadable file with the encrypted data and timestamp
      const fileContent = JSON.stringify({ encrypted, timestamp });
      const blob = new Blob([fileContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'encrypted_image.txt';
      a.click();
      URL.revokeObjectURL(url);
    };
    reader.readAsDataURL(imageFile); // Read the image file as a data URL
  };

  return (
    <div>
      <h2>Image Encryption</h2>
      <div>
        <label htmlFor="imageFile">Select Image:</label>
        <input
          type="file"
          id="imageFile"
          accept="image/*"
          onChange={handleFileChange}
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

export default ImageEncrypt;