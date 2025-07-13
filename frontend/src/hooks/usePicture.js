import { useContext } from "react";
import { PictureContext } from "../contexts/pictureContext";

const usePicture = () => {
  const context = useContext(PictureContext);

  if (!context) {
    throw new Error("usePicture deve ser usado dentro de um PictureProvider");
  }

  return context;
};

export default usePicture;