import React from "react";
import "./Notification.css";
import { UserContext } from "../../context/userContext";
import UserImage from "./../../components/user_image/UserImage";
import Button from "./../../components/button/Button";
import httpAgent from "./../../utils/httpAgent";

function Notification(props) {
  const userContext = React.useContext(UserContext);
  const user = userContext.user;
  const { _id, senderId, firstName, lastName, picture, recipientId, body, read, notificationType, date } = props.notification;
  const [readStatus, setReadStatus] = React.useState(read);
  const [accepting, setAccepting] = React.useState(false);
  const [rejecting, setRejecting] = React.useState(false);
  const [response, setResponse] = React.useState("");

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

  const updateNotification = async () => {
    try {
      const option = {
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ id: _id, read: true }),
      };
      const serverResponse = await httpAgent("PUT", `${process.env.REACT_APP_API}/api/v1/notification/${user._id}`, option);
      if (serverResponse.ok) {
        setReadStatus(true);
      } else {
        console.log(serverResponse);
      }
    } catch (error) {}
  };

  const updateReadStatus = async () => {
    if (!read) {
      await updateNotification();
    }
  };

  const acceptRequest = async () => {
    try {
      setAccepting(true);
      const notificationMessage = `${user.firstName} ${user.lastName} accepted your friend request. you are now mutual friends with ${user.firstName}.`;
      const option = {
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: recipientId,
          friendId: senderId,
          updateInfo: { status: "active" },
          notification: {
            senderId: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            picture: user.picture,
            recipientId: senderId,
            read: false,
            body: notificationMessage,
            notificationType: "request_accepted",
            date: new Date(),
          },
        }),
      };

      const serverResponse = await httpAgent("POST", `${process.env.REACT_APP_API}/api/v1/friend_request/accept`, option);
      const jsonResponse = await serverResponse.json();
      if (serverResponse.ok) {
        setResponse("accept");
      } else {
        console.log(jsonResponse);
      }
    } catch (error) {
      console.log(error);
    }
    setAccepting(false);
  };

  const rejectRequest = async () => {
    try {
      setRejecting(true);
      const notificationMessage = `${user.firstName} ${user.lastName} rejected your friend request.you are not mutual friends with ${user.firstName} at the moment`;
      const option = {
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: recipientId,
          friendId: senderId,
          notification: {
            senderId: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            picture: user.picture,
            recipientId: senderId,
            read: false,
            body: notificationMessage,
            notificationType: "request_rejected",
            date: new Date(),
          },
        }),
      };

      const serverResponse = await httpAgent("POST", `${process.env.REACT_APP_API}/api/v1/friend_request/reject`, option);
      const jsonResponse = await serverResponse.json();
      if (serverResponse.ok) {
        setResponse("reject");
      } else {
        console.log(jsonResponse);
      }
    } catch (error) {
      console.log(error);
    }
    setRejecting(false);
  };
  return (
    <div onClick={updateReadStatus} className="Notification">
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
          {response === "accept" ? (
            <Button variant="tertiary" size="small" icon="done" text="Friend Request Accepted" />
          ) : response === "reject" ? (
            <Button variant="secondary" size="small" icon="close" text="Friend Request Rejected" />
          ) : (
            <>
              <Button variant="primary" size="small" icon="person_add" text="Accept Request" action={acceptRequest} loading={accepting} />
              <Button variant="secondary" size="small" icon="person_remove" text="Reject Request" action={rejectRequest} loading={rejecting} />
            </>
          )}
        </div>
      ) : null}
      <div className="Notification-time">
        <p>{date}</p>
        {!readStatus ? <div className="Notification-read"></div> : null}
      </div>
    </div>
  );
}

export default Notification;
