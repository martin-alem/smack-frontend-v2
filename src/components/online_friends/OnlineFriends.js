import React from "react";
import "./OnlineFriends.css";
import UserImage from "./../../components/user_image/UserImage";
import Image from "./../../images/user.jpg";

function OnlineFriends() {
  const onlineFriends = [
    "busy",
    "online",
    "busy",
    "busy",
    "online",
    "busy",
    "online",
    "busy",
    "busy",
    "online",
    "busy",
    "online",
    "busy",
    "busy",
    "online",
    "busy",
    "online",
    "busy",
    "busy",
    "online",
  ];
  return (
    <div className="OnlineFriends">
      {onlineFriends.map((onlineFriend, index) => (
        <UserImage alt={onlineFriend} key={index} size="large" src={Image} status={onlineFriend} />
      ))}
    </div>
  );
}

export default OnlineFriends;
