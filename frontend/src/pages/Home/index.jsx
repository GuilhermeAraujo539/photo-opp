import React from "react";
import "./style.css";
import Logo from "../../components/Logo/index.jsx";
import Button from '../../components/Button/index.jsx';
import { useNavigate } from "react-router-dom";

export default function Home() {
  
  const navigator = useNavigate()
  
  const handleNext = () => {navigator("camera")} 
  
  return (
    <div className="home-screen">
      <div className="logo">
        <Logo className="logo-svg" />
      </div>
      <h1>Photo<br />Opp</h1>
      <Button onClick={handleNext}>
        Iniciar
      </Button>
    </div>
  );
}
