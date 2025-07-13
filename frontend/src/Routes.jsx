import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/index";
import Camera from "./pages/Camera/index";
import Preview from "./pages/Preview/index"
import Download from "./pages/Download/index"
import Thanks from "./pages/Thanks/index"
import Admin from "./pages/Admin/index"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/camera" element={<Camera />} />
      <Route path="/preview" element={<Preview />} />
      <Route path="/download" element={<Download />} />
      <Route path="/thanks" element={<Thanks />} />
      <Route path="/admin" element={<Admin />} />


      <Route path="*" element={<h1>404 - Página não encontrada</h1>} />
    </Routes>
  );
}