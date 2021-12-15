import React from "react";
import "./TextArea.css";

function TextArea(props) {
  return (
    <div className="TextArea">
      <textarea className="TextArea-textarea" placeholder="What's your story"></textarea>
    </div>
  );
}

export default TextArea;
