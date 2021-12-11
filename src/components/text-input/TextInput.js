import React from "react";
import "./TextInput.css";

function TextInput(props) {
  const { name, placeholder, action, error } = props;
  const textInputRef = React.useRef();
  React.useEffect(() => {
    if (error) {
      textInputRef.current.setAttribute("data-error", error);
    }
  }, [error]);
  return (
    <div className="TextInput" ref={textInputRef}>
      <input
        className="TextInput-input"
        type="text"
        name={name}
        placeholder={placeholder}
        onChange={action}
      />
    </div>
  );
}

export default TextInput;
