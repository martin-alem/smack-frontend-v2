import React from "react";
import "./PeopleYouKnow.css";
import { ModalContext } from "./../../context/modalContext";
import UserImage from "./../../components/user_image/UserImage";
import Image from "./../../images/user.jpg";

function PeopleYouKnow() {
  const modalContext = React.useContext(ModalContext);
  const { showProfile, setShowProfile } = modalContext;
  const people = ["busy", "online", "busy", "busy", "online", "busy", "busy", "online", "busy"];
  return (
    <div onClick={() => setShowProfile(!showProfile)} className="PeopleYouKnow">
      {people.map((person, index) => (
        <UserImage alt={person} key={index} size="m" src={Image} showStatus={false} />
      ))}
    </div>
  );
}

export default PeopleYouKnow;
