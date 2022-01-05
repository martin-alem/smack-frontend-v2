import React from "react";
import "./Notifications.css";
import { NotificationContext } from "./../../context/notificationContext";
import { UserContext } from "../../context/userContext";
import Notification from "./../../components/notification/Notification";
import httpAgent from "../../utils/httpAgent";

function Notifications() {
  const notificationContext = React.useContext(NotificationContext);
  const userContext = React.useContext(UserContext);
  const notifications = notificationContext.notification;
  const user = userContext.user;
  const limitRef = React.useRef(20);
  const offsetRef = React.useRef(0);
  const rootRef = React.useRef();

  const fetchNotification = async () => {
    try {
      const option = {
        headers: { Accept: "application/json" },
        body: null,
      };
      const limit = limitRef.current;
      const offset = offsetRef.current;
      const userId = user._id;
      const serverResponse = await httpAgent("GET", `${process.env.REACT_APP_API}/api/v1/notification/${userId}?limit=${limit}&offset=${offset}`, option);
      const jsonResponse = await serverResponse.json();
      if (serverResponse.ok) {
        const notifications = jsonResponse["payload"];
        notificationContext.setNotification(prevState => {
          return [...prevState, ...notifications["result"]];
        });
        return notifications["remaining"];
      } else {
        console.log(jsonResponse);
      }
    } catch (error) {
      console.log(error);
    }
    return 0;
  };

  const callback = async (entries, observer) => {
    if (entries[0].isIntersecting) {
      observer.unobserve(entries[0].target);
      const result = await fetchNotification();
      if (result > 0) {
        const notificationList = document.querySelectorAll(".Notification");
        const target = notificationList[notificationList.length - 1];
        observer.observe(target);
        offsetRef.current += 20;
      }
    }
  };

  const infiniteScroll = () => {
    const options = {
      root: rootRef.current,
      threshold: 1.0,
    };
    const notificationList = document.querySelectorAll(".Notification");
    if (notificationList.length > 0) {
      const target = notificationList[notificationList.length - 1];
      const interSectionObserver = new IntersectionObserver(callback, options);
      interSectionObserver.observe(target);
    }
  };

  React.useEffect(() => {
    const fetchAsync = async () => {
      await fetchNotification();
      infiniteScroll();
      offsetRef.current += 20;
    };
    fetchAsync();
    return () => {
      notificationContext.setNotification([]);
    };
  }, []);
  return (
    <div className="Notifications">
      <div className="Notifications-heading">Notifications</div>
      <div ref={rootRef} className="Notifications-notifications">
        {notifications.map(notification => {
          return <Notification key={notification._id} notification={notification} />;
        })}
      </div>
    </div>
  );
}

export default Notifications;
