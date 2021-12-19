import React from "react";
import "./People.css";
import UserImage from "./../../components/user_image/UserImage"
import Button from "./../../components/button/Button";

function People(props) {
  const { name, friends, image } = props;

  return (
    <div className="People">
      <div className="People-info">
        <UserImage size="s" alt={name} src={image} showStatus={false} />
        <div className="People-details">
          <h4>{name}</h4>
          <p>{friends} mutual friends</p>
        </div>
      </div>
      <div className="People-add">
        <Button variant="primary" size="small" text="Request" icon="person_add" />
      </div>
    </div>
  );
}

export default People;
