import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import Button from "../../components/Button";
import PreviewFrame from "../../components/Frame";
import usePicture from "../../hooks/usePicture";
import "./style.css";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function Preview() {
  const { picture, setQrCode, setPicture } = usePicture();
  const navigate = useNavigate();
  const frameRef = useRef(null);

  if (!picture) {
    navigate("/", { replace: true });
    return null;
  }

  async function sendImageToServer(dataUrl) {
    try {
      const response = await fetch(`${backendUrl}/postImage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ picture: dataUrl }),
      });

      if (!response.ok) {
        throw new Error(`Erro do servidor: ${response.statusText}`);
      }

      const data = await response.json();
      setQrCode(data.qrCode);
      setPicture(dataUrl);
      navigate("/download");
    } catch (error) {
      console.error("Erro ao enviar imagem:", error);
      alert("Falha ao enviar imagem. Tente novamente.");
    }
  }

  async function handleContinue() {
    if (!frameRef.current) return;

    try {
      const canvas = await html2canvas(frameRef.current, {
        useCORS: true,
        backgroundColor: null,
        scale: 2,
      });

      const dataUrl = canvas.toDataURL("image/png");
      await sendImageToServer(dataUrl);
    } catch (error) {
      console.error("Erro ao processar imagem:", error);
      alert(error.message || "Erro ao processar imagem.");
    }
  }

  return (
    <div className="preview-container">
      <PreviewFrame ref={frameRef} screenshot={picture} />
      <div className="button-group">
        <Button variant="white" onClick={() => navigate(-1)}>
          Voltar
        </Button>
        <Button variant="default" onClick={handleContinue}>
          Continuar
        </Button>
      </div>
    </div>
  );
}