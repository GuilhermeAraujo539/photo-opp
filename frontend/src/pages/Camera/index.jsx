import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import WebcamCapture from "../../components/Webcam";
import Loader from "../../components/Loader";
import usePicture from "../../hooks/usePicture";
import { useCountdown } from "../../hooks/useCountdouwn";

import "./style.css";

export default function Camera() {
  const webcamRef = useRef(null);
  const { setPicture } = usePicture();
  const navigate = useNavigate();

  const [isCameraReady, setIsCameraReady] = useState(false);
  const [countdown, startCountdown] = useCountdown(3);

  function captureImage() {
    const image = webcamRef.current?.capture();
    if (image) {
      setPicture(image);
      navigate("/preview");
    }
  }

  useEffect(() => {
    if (countdown === 0) {
      captureImage();
    }
  }, [countdown]);

  function handleCameraReady() {
    setIsCameraReady(true);
  }

  function handleCaptureClick() {
    startCountdown();
  }

  const shouldShowButton = isCameraReady && countdown === null;
  const shouldShowCountdown = countdown !== null;

  return (
    <div className="webcam-container">
      <WebcamCapture
        ref={webcamRef}
        onReady={handleCameraReady}
        className={isCameraReady ? "fade-in" : ""}
      />

      {!isCameraReady && (
        <div className="overlay-loader">
          <Loader />
        </div>
      )}

      {shouldShowButton && (
        <button className="capture-button" onClick={handleCaptureClick}>
          <img src="/images/botao.png" alt="Botão de captura" />
        </button>
      )}

      {shouldShowCountdown && (
        <div className="countdown-overlay">
          <span>{countdown}</span>
        </div>
      )}
    </div>
  );
}