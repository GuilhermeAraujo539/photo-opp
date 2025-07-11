import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import "./Webcam.css";

export default function WebcamCapture({ onReady, cameraReady }) {
  const webcamRef = useRef(null);
  const [screenshot, setScreenshot] = useState(null);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "environment",
  };

  useEffect(() => {
    const check = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (onReady) onReady();
        stream.getTracks().forEach((track) => track.stop());
      } catch {
        if (onReady) onReady();
      }
    };
    if (onReady) check();
  }, [onReady]);

  const capture = () => {
    if (webcamRef.current) {
      const image = webcamRef.current.getScreenshot();
      setScreenshot(image);
    }
  };

  return (
    <div className="camera">
      {!screenshot ? (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            style={{ width: "100%", maxWidth: "500px", borderRadius: "10px" }}
          />
          <br />
          {cameraReady && (
            <button onClick={capture}>📸 Tirar Foto</button>
          )}
        </>
      ) : (
        <>
          <img src={screenshot} alt="captura" style={{ maxWidth: "100%" }} />
          <br />
          <button onClick={() => setScreenshot(null)}>Tirar outra</button>
        </>
      )}
    </div>
  );
}
