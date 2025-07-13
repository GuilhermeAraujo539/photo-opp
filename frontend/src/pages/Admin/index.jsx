import React, { useEffect, useState, useCallback } from "react";
import "./style.css";

export default function PainelAdmin() {
  const [fotos, setFotos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [filtroData, setFiltroData] = useState("");

  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  const buscarFotos = useCallback(async () => {
    setCarregando(true);
    try {
      const resposta = await fetch(`${baseUrl}/pictures`, {
        headers: {
          "ngrok-skip-browser-warning": "true",
          "Content-Type": "application/json",
        },
      });

      const contentType = resposta.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const dados = await resposta.json();
        setFotos(dados);
      } else {
        const texto = await resposta.text();
        console.error("Resposta não é JSON válida:", texto);
      }
    } catch (erro) {
      console.error("Erro ao buscar fotos:", erro);
    } finally {
      setCarregando(false);
    }
  }, [baseUrl]);

  useEffect(() => {
    buscarFotos();
  }, [buscarFotos]);

  const formatarData = (dataISO) => {
    const data = new Date(dataISO);
    return data.toLocaleString("pt-BR");
  };

  const obterDataFormatada = (dataISO) => {
    return new Date(dataISO).toISOString().split("T")[0];
  };

  const fotosFiltradas = fotos.filter((foto) => {
    if (!filtroData) return true;
    return obterDataFormatada(foto.createdAt) === filtroData;
  });

  return (
    <div className="admin-container">
      <div className="admin-box">
        <h1>Painel Administrativo</h1>

        {carregando ? (
          <p>Carregando fotos...</p>
        ) : (
          <>
            <div className="filtro">
              <label>
                Filtrar por dia:
                <input
                  type="date"
                  value={filtroData}
                  onChange={(e) => setFiltroData(e.target.value)}
                />
              </label>
            </div>

            <p className="total">
              Total filtrado: <strong>{fotosFiltradas.length}</strong>
            </p>

            <div className="tabela-container">
              <table className="tabela-fotos">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Link da Foto</th>
                    <th>Data</th>
                  </tr>
                </thead>
                <tbody>
                  {fotosFiltradas.map((foto) => (
                    <tr key={foto.id}>
                      <td>{foto.id}</td>
                      <td>
                        <a
                          href={`${baseUrl}/download/${foto.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Baixar foto
                        </a>
                      </td>
                      <td>{formatarData(foto.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
