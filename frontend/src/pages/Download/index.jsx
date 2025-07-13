import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import QRCodeBox from "../../components/QRCode";
import usePicture from "../../hooks/usePicture";
import ThankYouModal from "../../components/Modal";
import "./style.css";

export default function Download() {
  const { picture, qrCode } = usePicture();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!picture) {
    navigate("/", { replace: true });
    return null;
  }

  function handleFinalizeClick() {
    if (isModalOpen) {
      navigate("/thanks");
    } else {
      setIsModalOpen(true);
    }
  }

  function handleModalClose() {
    navigate("/thanks");
  }

  return (
    <div className="preview-container">
      <div className="download-wrapper">
        <img src={picture} alt="captura" className="captured-photo" />
        <div className="qr-overlay">
          <QRCodeBox qrCodeBase64={qrCode} />
        </div>
      </div>

      <Button variant="default" onClick={handleFinalizeClick}>
        Finalizar
      </Button>

      {isModalOpen && <ThankYouModal onClose={handleModalClose} />}
    </div>
  );
}