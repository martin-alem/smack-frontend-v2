import React from "react";
import "./Notifications.css";
import Image from "./../../images/user.jpg";
import Notification from "./../../components/notification/Notification";

function Notifications() {
  const notifications = [
    {
      type: "accepted_request",
      message:
        "Martin Alemajoh accepted your friend request you are now mutual friends with Martin",
      icon: "people",
      date: "11/09/21",
      read: false,
      user: {
        name: "Martin Alemajoh Martin Alemajoh Martin Alemajoh Martin Alemajoh",
        image: Image,
        friends: 567,
      },
      label: "success",
      action: false,
    },

    {
      type: "rejected_request",
      message:
        "Adjyannah rejected your friend request you are not mutual friends with Adjyannah at the moment",
      icon: "people",
      date: "11/09/21",
      read: false,
      user: { name: "Adjyannah West", image: Image, friends: 567 },
      label: "fail",
      action: false,
    },
    {
      type: "missed_call",
      message:
        "Alahaji Suberu tried calling you 10+ times but could reach you. Try getting back to Alahaji to know why they called.",
      icon: "phone_missed",
      date: "11/09/21",
      read: true,
      user: { name: "Alahaji Suberu", image: Image, friends: 254 },
      label: "fail",
      action: false,
    },

    {
      type: "friend_request",
      message: "Hamadu Alisatu sent you a friend request",
      icon: "person_add",
      date: "11/09/21",
      read: true,
      user: { name: "Hamadu Alisatu", image: Image, friends: 254 },
      label: "success",
      action: true,
    },
  ];
  return (
    <div className="Notifications">
      <div className="Notifications-heading">Notifications</div>
      <div className="Notifications-notifications">
        {notifications.map((notification, index) => {
          return (
            <Notification
              key={index}
              type={notification.type}
              message={notification.message}
              icon={notification.icon}
              date={notification.date}
              read={notification.read}
              user={notification.user}
              label={notification.label}
              action={notification.action}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Notifications;
