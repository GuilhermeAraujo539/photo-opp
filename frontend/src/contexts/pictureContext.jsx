import React, { createContext } from "react";

const defaultState = {
  picture: "",
  setPicture: () => {},
  qrCode: "",
  setQrCode: () => {},
};

export const PictureContext = createContext(defaultState);