import React from "react";
import "./ChatArea.css";
import { MessageContext } from "../../context/messageContext";
import { CurrentChatContext } from "../../context/currentChatContext";
import { UserContext } from "../../context/userContext";
import ChatNav from "../../components/chat_nav/ChatNav";
import ChatControl from "../../components/chat_control/ChatControl";
import Message from "../../components/message/Message";

function ChatArea(props) {
  const messageContext = React.useContext(MessageContext);
  const currentChat = React.useContext(CurrentChatContext);
  const userContext = React.useContext(UserContext);
  const user = userContext.user;

  React.useEffect(() => {
    const userLastName = user.lastName;
    const friendLastName = currentChat.currentChat.lastName;

    console.log(userLastName, friendLastName);
  }, [currentChat, userContext]);

  return (
    <div className="ChatArea">
      <div className="ChatArea-nav">
        <ChatNav chatAreaRef={props.chatAreaRef} />
      </div>
      <div className="ChatArea-messages">
        {messageContext.messages.length ? (
          <>
            {messageContext.messages.map((message, index) => {
              return <Message message={message} owner={message.owner} key={index} />;
            })}
          </>
        ) : null}
      </div>
      <div className="ChatArea-controls">
        <ChatControl />
      </div>
    </div>
  );
}
export default ChatArea;
