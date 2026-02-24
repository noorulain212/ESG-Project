// src/components/ui/PrimaryButton.jsx
import React from "react";

export default function PrimaryButton({ 
  children, 
  onClick, 
  disabled = false, 
  style = {}, 
  className = "",
  type = "button" // Add this with default "button"
}) {
  return (
    <button
      type={type} // Use the prop instead of hardcoded "button"
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        padding: "0.5rem 1rem",
        fontSize: "14px",
        fontWeight: 600,
        borderRadius: "6px",
        backgroundColor: "#3B82F6",
        color: "#fff",
        border: "none",
        cursor: "pointer",
        transition: "0.2s",
        ...style,
      }}
    >
      {children}
    </button>
  );
}