import React, { useRef, useState, useEffect } from "react";
import WebcamCapture from "../../components/Webcam/index.jsx";
import Loader from "../../components/Loader/index.jsx";
import { useCountdown } from "../../hooks/useCountdouwn.js";
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function Camera() {
  const [cameraReady, setCameraReady] = useState(false);
  const webcamRef = useRef(null);
  const [countdown, startCountdown] = useCountdown(3);
  const navigate = useNavigate();

  const handleCameraReady = () => {
    setCameraReady(true);
  };

  const handleCapture = () => {
    startCountdown();
  };

  useEffect(() => {
    if (countdown === 0) {
      const image = webcamRef.current?.capture();
      if (image) {
        navigate("/preview", { state: { screenshot: image } });
      }
    }
  }, [countdown, navigate]);

  return (
    <div className="webcam-container">
      <WebcamCapture
        ref={webcamRef}
        onReady={handleCameraReady}
        className={cameraReady ? "fade-in" : ""}
      />

      {!cameraReady && (
        <div className="overlay-loader">
          <Loader />
        </div>
      )}

      {cameraReady && countdown === null && (
        <button className="capture-button" onClick={handleCapture}>
          <img src="/images/botao.png" alt="botao de captura" />
        </button>
      )}

      {countdown !== null && (
        <div className="countdown-overlay">
          <span>{countdown}</span>
        </div>
      )}
    </div>
  );
}