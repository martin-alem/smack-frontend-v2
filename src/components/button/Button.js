import React from "react";
import "./Button.css";

function Button(props) {
  const { variant, action, loading, icon, text } = props;
  const buttonClass = variant ? variant : "default";
  return (
    <div className="Button">
      <button disabled={loading} onClick={action} className={`Button-btn Button-${buttonClass}`}>
        {icon ? <span className="material-icons">{icon}</span> : null}
        {loading ? "Please wait..." : text}
      </button>
    </div>
  );
}

export default Button;
