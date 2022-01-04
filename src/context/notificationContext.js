import React from "react";

const NotificationContext = React.createContext();

function NotificationContextProvider(props) {
  const [notification, setNotification] = React.useState([]);
  return <NotificationContext.Provider value={{ notification, setNotification }}>{props.children}</NotificationContext.Provider>;
}

export { NotificationContext, NotificationContextProvider };
