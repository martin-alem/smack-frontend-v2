import React from "react";
import "./Toast.css";

function Toast(props) {
  const { type, display, text } = props.error;
  const { setError } = props;

  const generateIcons = type => {
    switch (type) {
      case "info":
        return "info";
      case "warning":
        return "warning_amber";
      case "error":
        return "error_outline";
      case "success":
        return "check_circle";
      default:
        return "help_outline";
    }
  };

  const closeToast = () => {
    setError({ type: "info", display: false, text: "" });
  };
  return (
    <div className={`Toast Toast-${type} ${!display ? "Toast-hide" : null}`}>
      <div className="Toast-icons">
        <span className="material-icons-outlined">{generateIcons(type)}</span>
        <span onClick={closeToast} className="material-icons-outlined">
          close
        </span>
      </div>
      <div className="Toast-message">{text}</div>
    </div>
  );
}

export default Toast;
