import { io } from "socket.io-client";
import React from "react";
import { UserContext } from "../context/userContext";

function useWebSocket() {
  const userContext = React.useContext(UserContext);
  const BASE_URL = process.env.REACT_APP_API;
  const socket = io(`${BASE_URL}`, { transports: ["websocket", "polling"] });

  socket.on("connect", () => {
    const payload = {
      userId: userContext.user._id,
    };
    socket.emit("join_room", payload);
    console.log("Socket connected");
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });
  return socket;
}

export default useWebSocket;
