import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button";
import QRCodeBox from "../../components/QRCode";
import Modal from "../../components/Modal";
import usePicture from "../../hooks/usePicture";

import "./style.css";

export default function Download() {
  const { picture, qrCode } = usePicture();
  const navigate = useNavigate();
  const [exibirModal, setExibirModal] = useState(false);

  if (!picture) {
    navigate("/", { replace: true });
    return null;
  }

  const finalizarProcesso = () => {
    if (exibirModal) {
      navigate("/thanks");
    } else {
      setExibirModal(true);
    }
  };

  const fecharModal = () => {
    navigate("/thanks");
  };

  return (
    <div className="preview-container">
      <div className="download-wrapper">
        <img src={picture} alt="Captura" className="captured-photo" />

        <div className="qr-overlay">
          <QRCodeBox qrCodeBase64={qrCode} />
        </div>
      </div>

      <Button variant="default" onClick={finalizarProcesso}>
        Finalizar
      </Button>

      {exibirModal && <Modal onClose={fecharModal} />}
    </div>
  );
}