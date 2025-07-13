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
  const previewRef = useRef(null);

  if (!picture) {
    navigate("/", { replace: true });
    return null;
  }

  const enviarImagemParaServidor = async (imagemBase64) => {
    try {
      const response = await fetch(`${backendUrl}/postImage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ picture: imagemBase64 }),
      });

      if (!response.ok) {
        throw new Error(`Erro no servidor: ${response.statusText}`);
      }

      const data = await response.json();
      setQrCode(data.qrCode);
      setPicture(imagemBase64);
      navigate("/download");
    } catch (erro) {
      console.error("Erro ao enviar imagem:", erro);
      alert("Falha ao enviar imagem. Tente novamente.");
    }
  };

  const capturarImagemComoCanvas = async () => {
    if (!previewRef.current) return;

    try {
      const canvas = await html2canvas(previewRef.current, {
        useCORS: true,
        backgroundColor: null,
        scale: 2,
      });

      const imagemBase64 = canvas.toDataURL("image/png");
      await enviarImagemParaServidor(imagemBase64);
    } catch (erro) {
      console.error("Erro ao processar imagem:", erro);
      alert(erro.message || "Erro ao processar imagem.");
    }
  };

  return (
    <div className="preview-container">
      <PreviewFrame ref={previewRef} screenshot={picture} />

      <div className="button-group">
        <Button variant="white" onClick={() => navigate(-1)}>
          Voltar
        </Button>

        <Button variant="default" onClick={capturarImagemComoCanvas}>
          Continuar
        </Button>
      </div>
    </div>
  );
}