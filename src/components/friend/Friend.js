import React from "react";
import "./Friend.css";
import Image from "./../../components/image/Image";
import More from "./../../components/more/More";

function Friend(props) {
  const { name, friends, image } = props;
  const contents = [
    { text: "Profile", icon: "person" },
    { text: "Block", icon: "block" },
  ];

  return (
    <div className="Friend">
      <div className="Friend-info">
        <Image dimension="70px" alt={name} src={image} />
        <div className="Friend-details">
          <h4>{name}</h4>
          <p>{friends} mutual friends</p>
        </div>
      </div>
      <More contents={contents} />
    </div>
  );
}

export default Friend;
