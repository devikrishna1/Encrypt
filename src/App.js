import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./componets/Login";
import Signup from "./componets/Signup";
import MainPage from "./componets/MainPage";
import EncryptPage from "./componets/EncryptPage";
import DecryptPage from "./componets/DecryptPage";
import TextEncrypt from "./componets/TextEncrypt";
import ImageEncrypt from "./componets/ImageEncrypt";
import AudioEncrypt from "./componets/AudioEncrypt";
import VideoEncrypt from "./componets/VideoEncrypt";
import TextDecrypt from "./componets/TextDecrypt";
import ImageDecrypt from "./componets/ImageDecrypt";
import AudioDecrypt from "./componets/AudioDecrypt";
import VideoDecrypt from "./componets/VideoDecrypt";
import SelectionPage from "./componets/SelectionPage";
import SteganographyPage from "./componets/SteganographyPage";
import SteganographySelectionPage from "./componets/SteganographySelectionPage";
import VideoSteganography from "./componets/VideoSteganography";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/encrypt" element={<EncryptPage />} />
        <Route path="/decrypt" element={<DecryptPage />} />
        <Route path="/encrypt/text" element={<TextEncrypt />} />
        <Route path="/encrypt/image" element={<ImageEncrypt />} />
        <Route path="/encrypt/audio" element={<AudioEncrypt />} />
        <Route path="/encrypt/video" element={<VideoEncrypt />} />
        <Route path="/decrypt/text" element={<TextDecrypt />} />
        <Route path="/decrypt/image" element={<ImageDecrypt />} />
        <Route path="/decrypt/audio" element={<AudioDecrypt />} />
        <Route path="/decrypt/video" element={<VideoDecrypt />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/select" element={<SelectionPage />} />
        <Route path="/steganography" element={<SteganographyPage />} />
        <Route
          path="/steganography-selection"
          element={<SteganographySelectionPage />}
        />
        <Route path="/steganography-video" element={<VideoSteganography />} />
      </Routes>
    </Router>
  );
}

export default App;
