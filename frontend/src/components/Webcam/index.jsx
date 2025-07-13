import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import Webcam from "react-webcam";
import "./style.css";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "environment",
};

const WebcamCapture = forwardRef(function WebcamCapture({ onReady }, ref) {
  const webcamRef = useRef(null);
  const [videoPronto, setVideoPronto] = useState(false);

  useImperativeHandle(ref, () => ({
    capture: capturarImagem,
  }));

  function capturarImagem() {
    return webcamRef.current?.getScreenshot() || null;
  }

  function aoCarregarVideo() {
    setVideoPronto(true);
    if (onReady) onReady();
  }

  const webcamStyle = {
    width: "100vw",
    height: "100vh",
    objectFit: "cover",
    opacity: videoPronto ? 1 : 0,
    transition: "opacity 0.6s ease-in-out",
  };

  return (
    <div className="camera" style={{ position: "relative" }}>
      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        onLoadedData={aoCarregarVideo}
        style={webcamStyle}
      />
    </div>
  );
});

export default WebcamCapture;