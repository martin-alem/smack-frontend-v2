import React from "react";
import "./TextInput.css";

function TextInput ( props )
{
    const { name, placeholder, action } = props;
  return (
    <div className="TextInput">
      <input className="TextInput-input" type="text" name={name} placeholder={placeholder} onChange={action} />
    </div>
  );
}

export default TextInput;
