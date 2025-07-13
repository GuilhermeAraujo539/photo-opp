import React, { useState, useMemo } from "react";
import { PictureContext } from "./pictureContext";

const PictureProvider = ({ children }) => {
  const [picture, setPicture] = useState("");
  const [qrCode, setQrCode] = useState("");

  const value = useMemo(() => ({
    picture,
    setPicture,
    qrCode,
    setQrCode,
  }), [picture, qrCode]);

  return (
    <PictureContext.Provider value={value}>
      {children}
    </PictureContext.Provider>
  );
};

export default PictureProvider;