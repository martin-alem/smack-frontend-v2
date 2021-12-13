import React from "react";
import "./UserImage.css";

function UserImage(props) {
  const { size, alt, src, status } = props;
  return (
    <div className="UserImage">
      <img src={src} alt={alt} className={`UserImage-image UserImage-image-${size}`} />
      <div className={`UserImage-status ${status}`}></div>
    </div>
  );
}

export default UserImage;
