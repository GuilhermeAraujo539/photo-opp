import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import PictureProvider from "./contexts/pictureProvider";

export default function App() {
  return (
    <BrowserRouter>
      <PictureProvider>
        <AppRoutes />
      </PictureProvider>
    </BrowserRouter>
  );
}
