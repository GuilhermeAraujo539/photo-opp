import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import WebcamCapture from "../../components/Webcam";
import Loader from "../../components/Loader";
import usePicture from "../../hooks/usePicture";
import { useCountdown } from "../../hooks/useCountdouwn";

import "./style.css";

export default function Camera() {
  const webcamRef = useRef(null);
  const { setPicture } = usePicture();
  const navigate = useNavigate();

  const [cameraPronta, setCameraPronta] = useState(false);
  const [contagem, iniciarContagem] = useCountdown(3);

  const capturarImagem = () => {
    const imagem = webcamRef.current?.capture();
    if (imagem) {
      setPicture(imagem);
      navigate("/preview");
    }
  };

  useEffect(() => {
    if (contagem === 0) {
      capturarImagem();
    }
  }, [contagem]);

  const handleCameraPronta = () => setCameraPronta(true);
  const handleCliqueCaptura = () => iniciarContagem();

  const deveExibirBotao = cameraPronta && contagem === null;
  const deveExibirContagem = contagem !== null;

  return (
    <div className="webcam-container">
      <WebcamCapture
        ref={webcamRef}
        onReady={handleCameraPronta}
        className={cameraPronta ? "fade-in" : ""}
      />

      {!cameraPronta && (
        <div className="overlay-loader">
          <Loader />
        </div>
      )}

      {deveExibirBotao && (
        <button className="capture-button" onClick={handleCliqueCaptura}>
          <img src="/images/botao.png" alt="Botão de captura" />
        </button>
      )}

      {deveExibirContagem && (
        <div className="countdown-overlay">
          <span>{contagem}</span>
        </div>
      )}
    </div>
  );
}