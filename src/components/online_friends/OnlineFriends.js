import React from "react";
import "./OnlineFriends.css";
import { ModalContext } from "./../../context/modalContext";
import UserImage from "./../../components/user_image/UserImage";
import Image from "./../../images/user.jpg";

function OnlineFriends() {
  const modalContext = React.useContext(ModalContext);
  const { showProfile, setShowProfile } = modalContext;
  const onlineFriends = [
    "busy",
    "online",
    "busy",
    "busy",
    "online",
    "busy",
    "busy",
    "online",
    "busy",
  ];
  return (
    <div onClick={() => setShowProfile(!showProfile)} className="OnlineFriends">
      {onlineFriends.map((onlineFriend, index) => (
        <UserImage
          alt={onlineFriend}
          key={index}
          size="m"
          src={Image}
          status={onlineFriend}
          showStatus={true}
        />
      ))}
    </div>
  );
}

export default OnlineFriends;
