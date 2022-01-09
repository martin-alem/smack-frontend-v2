import React from "react";

const ChatContext = React.createContext();

function ChatContextProvider(props) {
  const [chats, setChats] = React.useState([]);
  return <ChatContext.Provider value={{ chats, setChats }}>{props.children}</ChatContext.Provider>;
}

export { ChatContext, ChatContextProvider };
