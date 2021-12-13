import React from "react";
import "./Navigation.css";
import Logo from "./../logo/Logo";
import UserProfile from "./../../components/user_profile/UserProfile";

function Navigation() {
  return (
    <div className="Navigation">
      <div className="Navigation-logo">
        <Logo />
      </div>
      <div className="Navigation-links">
        <div className="Navigation-icon chat-icon active">
          <span className="material-icons-outlined" title="chat">
            sms
          </span>
        </div>

        <div className="Navigation-icon person-icon">
          <span className="material-icons-outlined" title="profile">
            person
          </span>
        </div>

        <div className="Navigation-icon friends-icon">
          <span className="material-icons-outlined" title="friends">
            people_alt
          </span>
        </div>

        <div className="Navigation-icon search-icon">
          <span className="material-icons-outlined" title="find friends">
            person_search
          </span>
        </div>

        <div className="Navigation-icon notification-icon">
          <span className="material-icons-outlined" title="notifications">
            notifications
          </span>
        </div>

        <div className="Navigation-icon setting-icon">
          <UserProfile />
        </div>
      </div>
      <div className="Navigation-setting">
        <UserProfile />
      </div>
    </div>
  );
}

export default Navigation;
