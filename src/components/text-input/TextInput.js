import React from "react";
import "./TextInput.css";

function TextInput(props) {
  const { name, placeholder, action, error, value } = props;
  const textInputRef = React.useRef();
  if (error) {
    textInputRef.current.setAttribute("data-error", error);
  }
  return (
    <div className="TextInput" ref={textInputRef}>
      <input className="TextInput-input" type="text" value={value} name={name} placeholder={placeholder} onChange={action} />
    </div>
  );
}

export default TextInput;
