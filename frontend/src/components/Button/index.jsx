import React from "react";
import "./style.css";

export default function Button({ onClick, children, variant = "default" }) {
  return (
    <button className={`button button--${variant}`} onClick={onClick}>
      {children}
    </button>
  );
}
