import React from "react";
import "./ChatControl.css";

function ChatControl(props) {
  const { name } = props;

  return (
    <div className="ChatControl">
      <div className="ChatControl-input">
        <textarea className="ChatControl-textarea" placeholder={`Message ${name}`}></textarea>
        <span className="material-icons-outlined">send</span>
      </div>
      <div className="ChatControl-actions">
        <span className="material-icons-outlined">photo_camera</span>
        <span className="material-icons-outlined">mic</span>
        <span className="material-icons-outlined">emoji_emotions</span>
        <span className="material-icons-outlined">attachment</span>
      </div>
    </div>
  );
}

export default ChatControl;
