import React from "react";
import "./Button.css";

function Button(props) {
  const { variant, action, loading, icon, text, size } = props;
  const buttonClass = ["primary", "secondary", "tertiary"].includes(variant) ? variant : "primary";
  const buttonSize = ["small", "medium", "large"].includes(size) ? size : "medium";
  return (
    <div className="Button">
      <button
        disabled={loading}
        onClick={action}
        className={`Button-btn Button-${buttonClass}-${buttonSize}`}
      >
        {icon ? <span className="material-icons">{icon}</span> : null}
        {loading ? "Please wait..." : text}
      </button>
    </div>
  );
}

export default Button;
