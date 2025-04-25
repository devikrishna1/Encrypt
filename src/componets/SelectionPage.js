import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SelectionPage.css";

function SelectionPage() {
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
      <h1>Select a Function</h1>
      <nav>
        <Link to="/main">
          <button className="nav-button">Cryptography</button>
        </Link>
        <Link to="/steganography">
          <button className="nav-button">Steganography</button>
        </Link>
      </nav>
    </div>
  );
}

export default SelectionPage;
