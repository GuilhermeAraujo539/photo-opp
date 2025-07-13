import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";
import Button from "../../components/Button";
import QRCodeBox from "../../components/QRCode";
import usePicture from "../../hooks/usePicture";
import "./style.css";

export default function Thanks() {
  const { qrCode } = usePicture();
  const navigate = useNavigate();

  function handleFinish() {
    navigate("/");
  }

  return (
    <div className="agradecimento-container">
      <header className="agradecimento-header">
        <div className="logo">
          <Logo className="logo-svg" />
        </div>
      </header>

      <main className="agradecimento-content">
        <h1>Obrigado!</h1>
        <p>Lorem ipsum dolor sit amet consectetur.</p>

        <div className="qr-code-final">
          <QRCodeBox qrCodeBase64={qrCode} />
        </div>
      </main>

      <footer>
        <Button variant="default" onClick={handleFinish}>
          Finalizar
        </Button>
      </footer>
    </div>
  );
}