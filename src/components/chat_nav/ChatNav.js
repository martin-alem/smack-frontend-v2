import React from "react";
import "./ChatNav.css";
import image from "./../../images/user.jpg";
import UserImage from "./../../components/user_image/UserImage";
import More from "./../../components/more/More";

function ChatNav(props) {
  const { chatAreaRef } = props;
  const contents = [
    { text: "Profile", icon: "person" },
    { text: "Archive", icon: "archive" },
    { text: "Mute", icon: "volume_off" },
    { text: "Delete", icon: "delete" },
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
          <div className="ChatNav-user-info">
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
