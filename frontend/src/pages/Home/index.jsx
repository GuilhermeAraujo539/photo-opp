import React from "react";
import "./Home.css";
import Logo from "../../components/Logo/Logo";
import Button from '../../components/Button/Button';
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
