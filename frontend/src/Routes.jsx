import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/index";
import Camera from "./pages/Camera/index";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/camera" element={<Camera />} />
      <Route path="*" element={<h1>404 - Página não encontrada</h1>} />
    </Routes>
  );
}
