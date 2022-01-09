import React from "react";
import "./Friend.css";
import { ModalContext } from "./../../context/modalContext";
import UserImage from "./../../components/user_image/UserImage";
import More from "./../../components/more/More";

function Friend(props) {
  const modalContext = React.useContext(ModalContext);
  const { showProfile, setShowProfile, setCurrentProfile } = modalContext;
  const { friend, showChatArea } = props;
  const { firstName, lastName, picture, email } = friend.friendId;

  const showUserProfile = () => {
    setCurrentProfile({
      firstName,
      lastName,
      picture,
      email,
    });
    setShowProfile(!showProfile);
  };
  const contents = [
    { text: "Profile", icon: "person", action: () => showUserProfile() },
    { text: "chat", icon: "chat", action: showChatArea },
    { text: "Block", icon: "block", action: () => console.log("Block user") },
    { text: "Remove", icon: "person_remove", action: () => console.log("Remove user") },
  ];

  return (
    <div className="Friend">
      <div onClick={showChatArea} className="Friend-info">
        <UserImage size="s" alt={lastName} src={picture} showStatus={true} status="online" />
        <div className="Friend-details">
          <h4>
            {firstName} {lastName}
          </h4>
          <p>{0} mutual friends</p>
        </div>
      </div>
      <More contents={contents} />
    </div>
  );
}

export default Friend;
