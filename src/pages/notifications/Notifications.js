import React from "react";
import "./Notifications.css";
import { NotificationContext } from "./../../context/notificationContext";
import { SocketContext } from "../../context/socketContext";
import { UserContext } from "../../context/userContext";
import Notification from "./../../components/notification/Notification";
import httpAgent from "../../utils/httpAgent";

function Notifications() {
  const notificationContext = React.useContext(NotificationContext);
  const userContext = React.useContext(UserContext);
  const notifications = notificationContext.notification;
  const socketContext = React.useContext(SocketContext);
  const socket = socketContext.socket;
  const user = userContext.user;
  const limitRef = React.useRef(50);
  const offsetRef = React.useRef(0);
  const rootRef = React.useRef();
  const [newNotification, setNewNotification] = React.useState(false);

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

  React.useEffect(() => {
    socket.on("notification", () => {
      setNewNotification(!newNotification);
    });
  }, []);

  React.useEffect(() => {
    const fetchAsync = async () => {
      await fetchNotification();
    };
    fetchAsync();
    return () => {
      notificationContext.setNotification([]);
    };
  }, [newNotification]);
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
