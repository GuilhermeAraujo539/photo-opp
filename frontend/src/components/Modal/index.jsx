import React from "react";
import "./style.css";

export default function ThankYouModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Obrigado!</h2>
        <p>Lorem ipsum dolor sit amet consectetur.</p>
      </div>
    </div>
  );
}