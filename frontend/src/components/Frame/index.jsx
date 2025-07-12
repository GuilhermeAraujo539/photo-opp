import React, { forwardRef } from "react";
import "./style.css";

const PreviewFrame = forwardRef(({ screenshot }, ref) => (
  <div className="preview-frame" ref={ref}>
    <div className="capture-wrapper">
      <img src={screenshot} alt="captura" className="captured-photo" />
      <img src="/images/moldura.png" alt="moldura" className="frame-overlay" />
    </div>
  </div>
));

export default PreviewFrame;
