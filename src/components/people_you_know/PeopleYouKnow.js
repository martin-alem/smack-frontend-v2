import React from "react";
import "./PeopleYouKnow.css";
import UserImage from "./../../components/image/Image";
import Image from "./../../images/user.jpg";

function PeopleYouKnow() {
  const people = [
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
    <div className="PeopleYouKnow">
      {people.map((person, index) => (
        <UserImage alt={person} key={index} dimension="70px" src={Image} />
      ))}
    </div>
  );
}

export default PeopleYouKnow;
