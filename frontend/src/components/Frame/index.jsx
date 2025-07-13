import React, { forwardRef } from "react";
import "./style.css";
import Logo from "../Logo";

const PreviewFrame = forwardRef(({ screenshot }, ref) => (
  <div className="preview-frame" ref={ref}>
    <div className="frame-header">
      <Logo />
      <div className="slogan">
        we make tech simple<span className="underscore">_</span>
      </div>
    </div>

    <div
      className="capture-wrapper"
      style={{
        backgroundImage: `url(${screenshot})`,
      }}
    >
      <div className="frame-overlay" />
    </div>

    <div className="frame-footer">
      we make tech simple<span className="underscore">_</span>
    </div>
  </div>
));

export default PreviewFrame;
