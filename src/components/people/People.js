import React from "react";
import "./People.css";
import Image from "./../../components/image/Image";
import Button from "./../../components/button/Button";

function People(props) {
  const { name, friends, image } = props;

  return (
    <div className="People">
      <div className="People-info">
        <Image dimension="70px" alt={name} src={image} />
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
