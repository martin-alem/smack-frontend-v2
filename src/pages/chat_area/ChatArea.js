import React from "react";
import "./ChatArea.css";
import ChatNav from "../../components/chat_nav/ChatNav";
import ChatControl from "../../components/chat_control/ChatControl";

function ChatArea(props) {
  return (
    <div className="ChatArea">
      <div className="ChatArea-nav">
        <ChatNav chatAreaRef={props.chatAreaRef}/>
      </div>
      <div className="ChatArea-messages"></div>
      <div className="ChatArea-controls">
        <ChatControl name="Martin Alemajoh" />
      </div>
    </div>
  );
}

export default ChatArea;
