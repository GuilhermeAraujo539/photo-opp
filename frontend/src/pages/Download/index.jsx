import React from "react";
import Button from "../../components/Button";
import PreviewFrame from "../../components/Frame";
import QRCodeBox from "../../components/QRCode";
import "./style.css";

export default function Preview() {
  return (
    <div className="preview-container">
      <PreviewFrame>
        <QRCodeBox />
      </PreviewFrame>

      <div className="button-group">
        <Button variant="default">Finalizar</Button>
      </div>
    </div>
  );
}
