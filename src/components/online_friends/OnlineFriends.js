import React from "react";
import "./OnlineFriends.css";
import UserImage from "./../../components/user_image/UserImage";
import Image from "./../../images/user.jpg";

function OnlineFriends(props) {
  const { showChatArea } = props;
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
    <div onClick={showChatArea} className="OnlineFriends">
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
