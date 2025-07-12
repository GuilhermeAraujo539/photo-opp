import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import PreviewFrame from "../../components/Frame/index.jsx";
import { generatePreviewImage } from "../../utils/generatePreviewImage";
import "./style.css";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function Preview() {
  const location = useLocation();
  const navigate = useNavigate();
  const previewFrameRef = useRef(null);

  const screenshot = location.state?.screenshot;
  if (!screenshot) {
    navigate("/", { replace: true });
    return null;
  }

  async function sendPreviewToServer(dataUrl) {
    try {
      const response = await fetch(`${backendUrl}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: dataUrl }),
      });

      if (!response.ok) {
        throw new Error(`Erro no servidor: ${response.statusText}`);
      }

      alert("Imagem enviada com sucesso!");
      navigate("/");
    } catch (error) {
      console.error("Erro ao enviar imagem:", error);
      alert("Falha ao enviar imagem. Tente novamente.");
    }
  }

  async function handleContinue() {
    if (!previewFrameRef.current) return;

    const frameWidth = previewFrameRef.current.offsetWidth;
    const frameHeight = previewFrameRef.current.offsetHeight;

    try {
      const dataUrl = await generatePreviewImage(screenshot, frameWidth, frameHeight);
      await sendPreviewToServer(dataUrl);
    } catch (error) {
      console.error(error);
      alert(error.message || "Erro ao processar imagem.");
    }
  }

  return (
    <div className="preview-container">
      <PreviewFrame ref={previewFrameRef} screenshot={screenshot} />
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