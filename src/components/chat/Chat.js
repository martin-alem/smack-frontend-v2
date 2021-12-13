import React from "react";
import "./Chat.css";
import UserImage from "./../../components/user_image/UserImage";

function Chat(props) {
  const { Image, name, lastMessage, time, unread, status } = props;

  return (
    <div className="Chat">
      <div className="Chat-info">
        <div className="Chat-image">
          <UserImage alt={name} size="large" src={Image} status={status} />
        </div>
        <div className="Chat-name-message">
          <h4 className="Chat-userName">{name}</h4>
          <p className="Chat-lastMessage">{lastMessage}</p>
        </div>
      </div>

      <div className="Chat-time-unread">
        <p className="Chat-time">{time}</p>
        <p className="Chat-unread">{unread}</p>
      </div>
    </div>
  );
}

export default Chat;
