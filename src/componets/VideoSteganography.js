import React, { useState, useRef } from "react";

function VideoSteganography() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [videoPreview, setVideoPreview] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video/")) {
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
      setStatus("✅ Video loaded. Ready to embed or extract.");
    } else {
      setStatus("❌ Please upload a valid video file.");
    }
  };

  const embedMessage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const binaryMessage =
      message
        .split("")
        .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
        .join("") + "00000000"; // null terminator

    const stream = video.captureStream();
    const recorder = new MediaRecorder(stream);
    const chunks = [];

    recorder.ondataavailable = (event) => chunks.push(event.data);
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setStatus("✅ Message embedded. You can now download the video.");
    };

    recorder.start();
    video.play();
  };

  const extractMessage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let binaryMessage = "";

    video.currentTime = 0;
    video.play();

    video.addEventListener("play", () => {
      const interval = setInterval(() => {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        for (let i = 0; i < data.length; i += 4) {
          binaryMessage += (data[i] & 1).toString(); // Red channel LSB
        }

        const delimiter = "00000000";
        const delimiterIndex = binaryMessage.indexOf(delimiter);
        if (delimiterIndex !== -1) {
          binaryMessage = binaryMessage.slice(0, delimiterIndex);
          let extractedMessage = "";
          for (let i = 0; i < binaryMessage.length; i += 8) {
            const byte = binaryMessage.slice(i, i + 8);
            extractedMessage += String.fromCharCode(parseInt(byte, 2));
          }
          setMessage(extractedMessage);
          setStatus("✅ Message extracted from video.");
          clearInterval(interval);
        }
      }, 100);
    });
  };

  return (
    <div>
      <h1>🎥 Video Steganography Tool</h1>
      <input type="file" accept="video/*" onChange={handleVideoUpload} />
      <video ref={videoRef} src={videoPreview} controls width="300" />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <textarea
        placeholder="Enter message to embed or view extracted message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div>
        <button onClick={embedMessage}>Embed Message</button>
        <button onClick={extractMessage}>Extract Message</button>
      </div>
      {status && <p>{status}</p>}
      {downloadUrl && (
        <a href={downloadUrl} download="stego_video.webm">
          <button>Download Stego Video</button>
        </a>
      )}
    </div>
  );
}

export default VideoSteganography;
