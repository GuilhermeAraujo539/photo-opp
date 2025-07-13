import React from "react";
import { useNavigate } from "react-router-dom";

import Logo from "../../components/Logo";
import Button from "../../components/Button";
import "./style.css";

export default function Home() {
  const navigate = useNavigate();

  function handleStart() {
    navigate("camera");
  }

  return (
    <div className="home-screen">
      <div className="logo">
        <Logo className="logo-svg" />
      </div>

      <h1>
        Photo
        <br />
        Opp
      </h1>

      <Button onClick={handleStart}>
        Iniciar
      </Button>
    </div>
  );
}