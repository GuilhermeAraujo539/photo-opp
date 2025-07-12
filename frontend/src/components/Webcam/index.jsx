import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import Webcam from "react-webcam";
import "./style.css";

const WebcamCapture = forwardRef(({ onReady }, ref) => {
  const webcamRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "environment",
  };

  useImperativeHandle(ref, () => ({
    capture: () => webcamRef.current?.getScreenshot() || null,
  }));

  const handleLoadedData = () => {
    setVideoReady(true);
    if (onReady) onReady();
  };

  return (
    <div className="camera" style={{ position: "relative" }}>
      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        onLoadedData={handleLoadedData}
        style={{
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          opacity: videoReady ? 1 : 0,
          transition: "opacity 0.6s ease-in-out",
        }}
      />
    </div>
  );
});

export default WebcamCapture;