import React from "react";
import { useNavigate } from "react-router-dom";
import "./SteganographyPage.css";

function SteganographyPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/select"); // Go back to selection page
  };

  return (
    <div className="steg-container">
      <h1 className="steg-title">Steganography Options</h1>
      <p className="steg-subtitle">Choose what you want to do:</p>

      <div className="steg-buttons">
        <button className="steg-button">Embed Message</button>
        <button className="steg-button">Extract Message</button>
      </div>

      <button className="back-button" onClick={handleBack}>
        Back
      </button>
    </div>
  );
}

export default SteganographyPage;
