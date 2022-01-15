import React from "react";
import "./Chat.css";
import UserImage from "./../../components/user_image/UserImage";
import { UserContext } from "../../context/userContext";
import { CurrentChatContext } from "../../context/currentChatContext";
import { formatDate } from "../../utils/util";

function Chat({ chat, showChatArea }) {
  console.log(showChatArea);
  const userContext = React.useContext(UserContext);
  const currentChatContext = React.useContext(CurrentChatContext);
  const user = userContext.user;
  const userId = user._id;
  const { recipientId, senderId, text, messageType, date } = chat;
  const friendProfile = recipientId._id === userId ? senderId : recipientId;
  const { picture, firstName, lastName, email, _id } = friendProfile;

  const handleShowChatArea = () => {
    const newChat = { firstName, lastName, picture, email, _id };
    currentChatContext.setCurrentChat(prevState => {
      return { ...prevState, ...newChat };
    });
    showChatArea();
  };
  return (
    <div onClick={handleShowChatArea} className="Chat">
      <div className="Chat-info">
        <div className="Chat-image">
          <UserImage alt={lastName} size="s" showStatus={true} src={picture} status={true} />
        </div>
        <div className="Chat-name-message">
          <h4 className="Chat-userName">{`${firstName} ${lastName}`}</h4>
          <p className="Chat-lastMessage">{text}</p>
        </div>
      </div>

      <div className="Chat-time-unread">
        <p className="Chat-time">{formatDate(date.toString())["time"]}</p>
        <p className="Chat-unread">{0}</p>
      </div>
    </div>
  );
}

export default Chat;
