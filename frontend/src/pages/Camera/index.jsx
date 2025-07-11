import React, { useState } from "react";
import WebcamCapture from "../../components/Webcam/Webcam";
import Loader from "../../components/Loader/Loader";

export default function Camera() {
  const [cameraReady, setCameraReady] = useState(false);

  const handleCameraReady = () => {
    setCameraReady(true);
  };

  return (
    <div className="webcam-container">
      <WebcamCapture cameraReady={cameraReady} onReady={handleCameraReady} />
      {!cameraReady && <Loader />}
    </div>
  );
}
