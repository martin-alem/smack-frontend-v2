import React from "react";
import "./ChatArea.css";
import ChatNav from "../../components/chat_nav/ChatNav";

function ChatArea() {
  return (
    <div className="ChatArea">
      <div className="ChatArea-nav">
        <ChatNav />
      </div>
    </div>
  );
}

export default ChatArea;
