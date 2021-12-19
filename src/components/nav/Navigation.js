import React from "react";
import "./Navigation.css";
import Logo from "./../logo/Logo";
import UserProfile from "./../../components/user_profile/UserProfile";

function Navigation(props) {
  const { setPage } = props;
  const chatRef = React.useRef();
  const profileRef = React.useRef();
  const friendsRef = React.useRef();
  const peopleRef = React.useRef();
  const notificationsRef = React.useRef();

  let activeRef = chatRef;

  const setActiveClass = (event, ref) => {
    const parent = event.target.parentElement;
    if (!parent.classList.contains("active")) {
      activeRef.current.classList.remove("active");
      parent.classList.add("active");
      activeRef.current = parent;
    }
  };

  const handleNavClick = (event, page) => {
    switch (page) {
      case "chats":
        setActiveClass(event, chatRef);
        break;
      case "profile":
        setActiveClass(event, profileRef);
        break;
      case "friends":
        setActiveClass(event, friendsRef);
        break;
      case "find_friends":
        setActiveClass(event, peopleRef);
        break;
      case "notifications":
        setActiveClass(event, notificationsRef);
        break;
      default:
        setActiveClass(event, chatRef);
    }

    setPage(page);
  };

  return (
    <div className="Navigation">
      <div className="Navigation-logo">
        <Logo />
      </div>
      <div className="Navigation-links">
        <div ref={chatRef} className="Navigation-icon chat-icon active">
          <span
            onClick={event => {
              handleNavClick(event, "chats");
            }}
            className="material-icons-outlined"
            title="chat"
          >
            sms
          </span>
        </div>

        <div ref={profileRef} className="Navigation-icon person-icon">
          <span
            onClick={event => {
              handleNavClick(event, "profile");
            }}
            className="material-icons-outlined"
            title="profile"
          >
            person
          </span>
        </div>

        <div ref={friendsRef} className="Navigation-icon friends-icon">
          <span
            onClick={event => {
              handleNavClick(event, "friends");
            }}
            className="material-icons-outlined"
            title="friends"
          >
            people_alt
          </span>
        </div>

        <div ref={peopleRef} className="Navigation-icon search-icon">
          <span
            onClick={event => {
              handleNavClick(event, "find_friends");
            }}
            className="material-icons-outlined"
            title="find friends"
          >
            person_search
          </span>
        </div>

        <div ref={notificationsRef} className="Navigation-icon notification-icon">
          <span
            onClick={event => {
              handleNavClick(event, "notifications");
            }}
            className="material-icons-outlined"
            title="notifications"
          >
            notifications
          </span>
        </div>

        <div className="Navigation-icon setting-icon">
          <UserProfile setPage={setPage} />
        </div>
      </div>
      <div className="Navigation-setting">
        <UserProfile setPage={setPage} />
      </div>
    </div>
  );
}

export default Navigation;
