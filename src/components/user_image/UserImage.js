import React from "react";
import "./UserImage.css";

function UserImage(props) {
  const { size, alt, src, status, showStatus } = props;
  return (
    <div className="UserImage">
      <img src={src} alt={alt} className={`UserImage-image UserImage-image-${size}`} />
      {showStatus ? (
        <div className={`UserImage-status UserImage-status-${size} ${status}`}></div>
      ) : null}
    </div>
  );
}

export default UserImage;
