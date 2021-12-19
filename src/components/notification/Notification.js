import React from "react";
import "./Notification.css";
import UserImage from "./../../components/user_image/UserImage";
import Button from "./../../components/button/Button";

function Notification(props) {
  const { type, label, message, icon, date, read, user, action } = props;

  const determineHeading = type => {
    switch (type) {
      case "accepted_request":
        return "Congratulations!!";
      case "rejected_request":
        return "Unfortunately";
      case "missed_call":
        return "Missed Call";
      case "friend_request":
        return "Friend Request";
      default:
        return "";
    }
  };
  return (
    <div className="Notification">
      <div className="Notification-sender">
        <div className="Notification-info">
          <UserImage size="m" alt={user.name} src={user.image} showStatus={false} />
          <div className="Notification-details">
            <h4>{user.name}</h4>
            <p>{user.friends} mutual friends</p>
          </div>
        </div>
        <span className={`material-icons-outlined Notification-${label}`}>{icon}</span>
      </div>
      <div className="Notification-message">
        <h4>{determineHeading(type)}</h4>
        <p>{message}</p>
      </div>
      {action ? (
        <div className="Notification-action">
          <Button variant="primary" size="small" icon="person_add" text="Accept Request" />
          <Button variant="secondary" size="small" icon="person_add" text="Reject Request" />
        </div>
      ) : null}
      <div className="Notification-time">
        <p>{date}</p>
        {!read ? <div className="Notification-read"></div> : null}
      </div>
    </div>
  );
}

export default Notification;
