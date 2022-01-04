import React from "react";
import "./Notification.css";
import UserImage from "./../../components/user_image/UserImage";
import Button from "./../../components/button/Button";

function Notification(props) {
  const { senderId, firstName, lastName, picture, recipientId, body, read, notificationType, date } = props.notification;

  const determineHeading = type => {
    switch (type) {
      case "request_accepted":
        return "Congratulations!!";
      case "request_rejected":
        return "Unfortunately";
      case "missed_call":
        return "Missed Call";
      case "friend_request":
        return "Friend Request";
      default:
        return "";
    }
  };

  const determineIconAndLabel = type => {
    switch (type) {
      case "missed_call":
        return ["phone_missed", "fail"];
      case "request_accepted":
        return ["people", "success"];
      case "request_rejected":
        return ["people", "fail"];
      case "friend_request":
        return ["person_add", "success"];
      default:
        return ["people", "success"];
    }
  };
  return (
    <div className="Notification">
      <div className="Notification-sender">
        <div className="Notification-info">
          <UserImage size="m" alt={lastName} src={picture} showStatus={false} />
          <div className="Notification-details">
            <h4>
              {firstName} {lastName}
            </h4>
            <p>{0} mutual friends</p>
          </div>
        </div>
        <span className={`material-icons-outlined Notification-${determineIconAndLabel(notificationType)[1]}`}>{determineIconAndLabel(notificationType)[0]}</span>
      </div>
      <div className="Notification-message">
        <h4>{determineHeading(notificationType)}</h4>
        <p>{body}</p>
      </div>
      {notificationType === "friend_request" ? (
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
