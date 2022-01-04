import React from "react";
import "./Friend.css";
import { ModalContext } from "./../../context/modalContext";
import UserImage from "./../../components/user_image/UserImage";
import More from "./../../components/more/More";

function Friend(props) {
  const modalContext = React.useContext(ModalContext);
  const { showProfile, setShowProfile } = modalContext;
  const { friend, showChatArea } = props;
  const contents = [
    { text: "Profile", icon: "person", action: () => setShowProfile(!showProfile) },
    { text: "chat", icon: "chat", action: showChatArea },
    { text: "Block", icon: "block", action: () => console.log("Block user") },
    { text: "Remove", icon: "person_remove", action: () => console.log("Remove user") },
  ];

  return (
    <div className="Friend">
      <div onClick={showChatArea} className="Friend-info">
        <UserImage size="s" alt={friend.lastName} src={friend.picture} showStatus={true} status="online" />
        <div className="Friend-details">
          <h4>
            {friend.firstName} {friend.lastName}
          </h4>
          <p>{0} mutual friends</p>
        </div>
      </div>
      <More contents={contents} />
    </div>
  );
}

export default Friend;
