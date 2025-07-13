import React, { useEffect, useState, useCallback } from "react";
import "./style.css";

export default function AdminPanel() {
  const [pictures, setPictures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState("");

  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchPictures = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/pictures`, {
        headers: {
          "ngrok-skip-browser-warning": "true",
          "Content-Type": "application/json",
        },
      });

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        setPictures(data);
      } else {
        const text = await response.text();
        console.error("Resposta não é JSON válida:", text);
      }
    } catch (error) {
      console.error("Erro ao buscar fotos:", error);
    } finally {
      setIsLoading(false);
    }
  }, [baseUrl]);

  useEffect(() => {
    fetchPictures();
  }, [fetchPictures]);

  function formatDateTime(isoDate) {
    const date = new Date(isoDate);
    return date.toLocaleString("pt-BR");
  }

  function extractDate(isoDate) {
    return new Date(isoDate).toISOString().split("T")[0];
  }

  const filteredPictures = pictures.filter((picture) => {
    if (!dateFilter) return true;
    return extractDate(picture.createdAt) === dateFilter;
  });

  return (
    <div className="admin-container">
      <div className="admin-box">
        <h1>Painel Administrativo</h1>

        {isLoading ? (
          <p>Carregando fotos...</p>
        ) : (
          <>
            <div className="filtro">
              <label>
                Filtrar por dia:
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                />
              </label>
            </div>

            <p className="total">
              Total filtrado: <strong>{filteredPictures.length}</strong>
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
                  {filteredPictures.map((picture) => (
                    <tr key={picture.id}>
                      <td>{picture.id}</td>
                      <td>
                        <a
                          href={`${baseUrl}/download/${picture.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Baixar foto
                        </a>
                      </td>
                      <td>{formatDateTime(picture.createdAt)}</td>
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