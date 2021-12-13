import React from "react";
import "./UserProfile.css";
import Profile from "./../../images/user.jpg";

function UserProfile() {
  const contextMenu = React.useRef();
  const toggleContextMenu = () => {
    contextMenu.current.classList.toggle("hide");
  };
  return (
    <div className="UserProfile">
      <div ref={contextMenu} className="UserProfile-context-menu hide">
        <div className="UserProfile-context">
          <span className="profile-text">Profile</span>
          <span className="material-icons-outlined">badge</span>
        </div>
        <div className="UserProfile-context">
          <span className="profile-text">Settings</span>
          <span className="material-icons-outlined">settings</span>
        </div>
        <div className="UserProfile-context">
          <span className="profile-text">Logout</span>
          <span className="material-icons-outlined">logout</span>
        </div>
      </div>
      <img
        onClick={toggleContextMenu}
        className="profile"
        src={Profile}
        alt="User profile"
        width="50px"
        height="50px"
      />
    </div>
  );
}

export default UserProfile;
