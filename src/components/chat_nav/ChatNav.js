import React from "react";
import "./ChatNav.css";
import { CurrentChatContext } from "../../context/currentChatContext";
import { UserContext } from "../../context/userContext";
import { SocketContext } from "../../context/socketContext";
import UserImage from "./../../components/user_image/UserImage";
import More from "./../../components/more/More";

function ChatNav(props) {
  const currentChatContext = React.useContext(CurrentChatContext);
  const currentChat = currentChatContext.currentChat;
  const socketContext = React.useContext(SocketContext);
  const socket = socketContext.socket;
  const userContext = React.useContext(UserContext);
  const user = userContext.user;
  const { chatAreaRef } = props;

  const contents = [
    { text: "Archive", icon: "archive", action: () => console.log("Archive this chat") },
    { text: "Mute", icon: "volume_off", action: () => console.log("Mute this chat") },
    { text: "Delete", icon: "delete", action: () => console.log("Delete this chat") },
  ];

  const hideChatArea = () => {
    chatAreaRef.current.removeAttribute("style");
  };

  const make_call = () => {
    const payload = {
      recipientId: currentChat._id,
      callerId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      picture: user.picture,
    };
    socket.emit("call", payload);
    window.location.replace("/call_room");
  };
  return (
    <div className="ChatNav">
      {Object.keys(currentChat).length ? (
        <>
          <div className="ChatNav-left">
            <span onClick={hideChatArea} className="material-icons-outlined">
              chevron_left
            </span>
            <div className="ChatNav-user-info">
              <UserImage src={currentChat.picture} alt={`${currentChat.lastName}'s image`} size="xs" showStatus={true} status="online" />
              <h4>{`${currentChat.firstName} ${currentChat.lastName}`}</h4>
            </div>
          </div>
          <div className="ChatNav-right">
            <span onClick={make_call} className="material-icons-outlined">
              videocam
            </span>
            <More contents={contents} />
          </div>
        </>
      ) : null}
    </div>
  );
}

export default ChatNav;
