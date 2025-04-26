import React, { useState, useRef } from "react";
import "./SteganographyPage.css";

function SteganographyPage() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [showDownload, setShowDownload] = useState(false);
  const canvasRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          setImagePreview(canvas.toDataURL());
          setStatus("✅ Image loaded. Ready to embed or extract.");
          setShowDownload(false);
          setDownloadUrl(null);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      setStatus("❌ Please upload a valid image file.");
    }
  };

  const embedMessage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    const binaryMessage =
      message
        .split("")
        .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
        .join("") + "00000000"; // null terminator

    if (binaryMessage.length > data.length / 4) {
      setStatus("❌ Message too long for this image.");
      return;
    }

    for (let i = 0; i < binaryMessage.length; i++) {
      data[i * 4] = (data[i * 4] & 0xfe) | parseInt(binaryMessage[i]); // modify red channel LSB
    }

    ctx.putImageData(imgData, 0, 0);
    const embeddedURL = canvas.toDataURL();
    setImagePreview(embeddedURL);
    setDownloadUrl(embeddedURL);
    setShowDownload(true);
    setStatus("✅ Message embedded. You can now download the image.");
  };

  const extractMessage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    let binaryMessage = "";
    for (let i = 0; i < data.length; i += 4) {
      binaryMessage += (data[i] & 1).toString();
    }

    const chars = [];
    for (let i = 0; i < binaryMessage.length; i += 8) {
      const byte = binaryMessage.slice(i, i + 8);
      if (byte === "00000000") break;
      chars.push(String.fromCharCode(parseInt(byte, 2)));
    }

    const extracted = chars.join("");
    setMessage(extracted);
    setStatus("✅ Message extracted from image.");
  };

  return (
    <div className="steg-container">
      <h1>🕵️ Steganography Tool</h1>

      <input type="file" accept="image/*" onChange={handleImageUpload} />

      <textarea
        placeholder="Enter message to embed or view extracted message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <div className="button-group">
        <button onClick={embedMessage}>Embed Message</button>
        <button onClick={extractMessage}>Extract Message</button>
      </div>

      {status && <p className="status">{status}</p>}

      <canvas ref={canvasRef} style={{ display: "none" }} />

      {imagePreview && (
        <div className="image-preview">
          <img src={imagePreview} alt="Embedded Output" />
        </div>
      )}

      {showDownload && downloadUrl && (
        <a href={downloadUrl} download="embedded_image.png">
          <button className="download-btn">Download Embedded Image</button>
        </a>
      )}
    </div>
  );
}

export default SteganographyPage;
