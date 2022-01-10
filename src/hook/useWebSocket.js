import { io } from "socket.io-client";

function useWebSocket() {
  const BASE_URL = process.env.REACT_APP_API;
  const socket = io(`${BASE_URL}`, { transports: ["websocket", "polling"] });

  socket.on("connect", () => {
    console.log("Socket connected");
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });
  return socket;
}

export default useWebSocket;
