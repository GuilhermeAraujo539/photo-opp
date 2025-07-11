import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import Webcam from "react-webcam";
import "./Webcam.css";

const WebcamCapture = forwardRef(({ onReady }, ref) => {
  const webcamRef = useRef(null);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "environment",
  };

  useImperativeHandle(ref, () => ({
    capture: () => {
      return webcamRef.current?.getScreenshot() || null;
    },
  }));

  return (
    <div className="camera">
      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        onUserMedia={() => {
          if (onReady) onReady();
        }}
        style={{ width: "100vw", height: "100vh", objectFit: "cover" }}
      />
    </div>
  );
});

export default WebcamCapture;