import React from "react";

const MessageContext = React.createContext();

function MessageContextProvider(props) {
  const [messages, setMessages] = React.useState([]);
  return <MessageContext.Provider value={{ messages, setMessages }}>{props.children}</MessageContext.Provider>;
}

export { MessageContext, MessageContextProvider };
