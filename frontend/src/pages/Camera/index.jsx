import React, { useRef, useState } from "react";
import WebcamCapture from "../../components/Webcam/Webcam";
import Loader from "../../components/Loader/Loader";
import { useCountdown } from "../../hooks/useCountdouwn.js";
import "./Camera.css";

export default function Camera() {
  const [cameraReady, setCameraReady] = useState(false);
  const [screenshot, setScreenshot] = useState(null);
  const webcamRef = useRef(null);

  const [countdown, startCountdown] = useCountdown(3);

  const handleCameraReady = () => setCameraReady(true);

  const handleCapture = () => {
    startCountdown();
  };

  React.useEffect(() => {
    if (countdown === 0) {
      const image = webcamRef.current?.capture();
      if (image) setScreenshot(image);
    }
  }, [countdown]);

  const handleReset = () => {
    setScreenshot(null);
    setCameraReady(false);
  };

  return (
    <div className="webcam-container" style={{ position: "relative" }}>
      {!screenshot && <WebcamCapture ref={webcamRef} onReady={handleCameraReady} />}

      {!cameraReady && !screenshot && (
        <div className="overlay-loader">
          <Loader />
        </div>
      )}

      {cameraReady && !screenshot && countdown === null && (
        <button className="capture-button" onClick={handleCapture}>
          <img src="/images/botao.png" alt="botao de captura" />
        </button>
      )}

      {countdown !== null && (
        <div className="countdown-overlay">
          <span>{countdown}</span>
        </div>
      )}

      {screenshot && (
        <div className="camera" style={{ position: "relative", display: "inline-block" }}>
          <img
            src={screenshot}
            alt="captura"
            className="captured-photo"
          />
          <img
            src="/images/moldura.png"
            alt="moldura"
            className="frame-overlay"
          />
          <br />
          <button className="reset-button" onClick={handleReset}>
            Tirar outra
          </button>
        </div>
      )}
    </div>
  );
}