import React from "react";
import "./style.css";

export default function QRCodeBox() {
  return (
    <div className="qr-box">
      <span className="qr-title">Fazer download</span>
      <div className="qr-code-placeholder">(QR CODE)</div>
    </div>
  );
}