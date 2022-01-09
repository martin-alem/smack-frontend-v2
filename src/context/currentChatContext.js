import React from "react";
import useLocalStorage from "../hook/useLocalStorage";

const CurrentChatContext = React.createContext();

function CurrentChatContextProvider(props) {
  const [currentChat, setCurrentChat] = useLocalStorage("current_chat", {});
  return <CurrentChatContext.Provider value={{ currentChat, setCurrentChat }}>{props.children}</CurrentChatContext.Provider>;
}

export { CurrentChatContext, CurrentChatContextProvider };
