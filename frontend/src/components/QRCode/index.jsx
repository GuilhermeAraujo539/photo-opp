import React from "react";
import "./style.css";

export default function QRCodeBox({ qrCodeBase64 }) {
  return (
    <div className="qr-box">
      <span className="qr-title">Fazer download</span>
      {qrCodeBase64 ? (
        <img src={qrCodeBase64} alt="QR Code" className="qr-code-img" />
      ) : (
        <div className="qr-code-placeholder">(QR CODE)</div>
      )}
    </div>
  );
}