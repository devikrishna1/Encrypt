import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SelectionPage.css";

function SteganographySelectionPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loginTime");
    navigate("/");
  };

  return (
    <div className="container">
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <h1>Select Steganography Type</h1>
      <nav>
        <Link to="/steganography">
          <button className="nav-button">Image</button>
        </Link>
        {/* <Link to="/steganography-video">
          <button className="nav-button">Video</button>
        </Link> */}
      </nav>
    </div>
  );
}

export default SteganographySelectionPage;
