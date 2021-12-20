import React from "react";
import "./ChatNav.css";
import { ModalContext } from "./../../context/modalContext";
import image from "./../../images/user.jpg";
import UserImage from "./../../components/user_image/UserImage";
import More from "./../../components/more/More";

function ChatNav(props) {
  const modalContext = React.useContext(ModalContext);
  const { showProfile, setShowProfile } = modalContext;
  const { chatAreaRef } = props;
  const contents = [
    { text: "Profile", icon: "person", action: () => setShowProfile(!showProfile) },
    { text: "Archive", icon: "archive", action: () => console.log("Archive this chat") },
    { text: "Mute", icon: "volume_off", action: () => console.log("Mute this chat") },
    { text: "Delete", icon: "delete", action: () => console.log("Delete this chat") },
  ];

  const hideChatArea = () => {
    chatAreaRef.current.removeAttribute("style");
  };
  return (
    <>
      <div className="ChatNav">
        <div className="ChatNav-left">
          <span onClick={hideChatArea} className="material-icons-outlined">
            chevron_left
          </span>
          <div onClick={() => setShowProfile(!showProfile)} className="ChatNav-user-info">
            <UserImage src={image} alt="Image" size="xs" showStatus={true} status="online" />
            <h4>Martin Alemajoh</h4>
          </div>
        </div>
        <div className="ChatNav-right">
          <span className="material-icons-outlined">phone</span>
          <span className="material-icons-outlined">videocam</span>
          <More contents={contents} />
        </div>
      </div>
    </>
  );
}

export default ChatNav;
