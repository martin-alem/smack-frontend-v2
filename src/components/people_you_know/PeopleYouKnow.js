import React from "react";
import "./PeopleYouKnow.css";
import UserImage from "./../../components/user_image/UserImage";
import Image from "./../../images/user.jpg";

function PeopleYouKnow() {
  const people = ["busy", "online", "busy", "busy", "online", "busy", "busy", "online", "busy"];
  return (
    <div className="PeopleYouKnow">
      {people.map((person, index) => (
        <UserImage alt={person} key={index} size="m" src={Image} showStatus={false} />
      ))}
    </div>
  );
}

export default PeopleYouKnow;
