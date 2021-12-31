import React from "react";
import "./TextArea.css";

function TextArea(props) {
  const { name, placeholder, action, value } = props;

  return (
    <div className="TextArea">
      <textarea name={name} placeholder={placeholder} onChange={action} value={value} className="TextArea-textarea"></textarea>
    </div>
  );
}

export default TextArea;
