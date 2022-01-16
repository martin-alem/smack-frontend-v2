import React from "react";
import "./ChatArea.css";
import { MessageContext } from "../../context/messageContext";
import { CurrentChatContext } from "../../context/currentChatContext";
import { UserContext } from "../../context/userContext";
import ChatNav from "../../components/chat_nav/ChatNav";
import ChatControl from "../../components/chat_control/ChatControl";
import Message from "../../components/message/Message";
import httpAgent from "../../utils/httpAgent";

function ChatArea(props) {
  const messageContext = React.useContext(MessageContext);
  const currentChat = React.useContext(CurrentChatContext);
  const userContext = React.useContext(UserContext);
  const user = userContext.user;
  const limitRef = React.useRef(20);
  const offsetRef = React.useRef(0);
  const rootRef = React.useRef();

  const fetchMessages = async (userId, friendId) => {
    try {
      const option = {
        headers: { Accept: "application/json" },
        body: null,
      };
      const limit = limitRef.current;
      const offset = offsetRef.current;
      const serverResponse = await httpAgent("GET", `${process.env.REACT_APP_API}/api/v1/messages/${userId}/${friendId}?limit=${limit}&offset=${offset}`, option);
      const jsonResponse = await serverResponse.json();
      if (serverResponse.ok) {
        const messages = jsonResponse["payload"];
        messageContext.setMessages(messages["result"].reverse());
        return messages["remaining"];
      } else {
        console.log(jsonResponse);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createMessage = messagePayload => {
    const messageDirection = user._id === messagePayload.senderId._id ? "outgoing" : "incoming";
    const message = {
      type: messageDirection,
      content: messagePayload.text,
      attachments: messagePayload.media,
      time: messagePayload.date,
      owner: messagePayload.senderId,
    };
    return message;
  };

  React.useEffect(() => {
    rootRef.current.scrollTo({ left: 0, top: rootRef.current.scrollHeight, behavior: "smooth" });
  });

  React.useEffect(() => {
    const userId = user._id;
    const friendId = currentChat.currentChat._id;
    const fetchAsync = async (userId, friendId) => {
      if (userId && friendId) {
        await fetchMessages(userId, friendId);
      }
    };
    fetchAsync(userId, friendId);
  }, [currentChat, userContext]);

  return (
    <div className="ChatArea">
      <div className="ChatArea-nav">
        <ChatNav chatAreaRef={props.chatAreaRef} />
      </div>
      <div ref={rootRef} className="ChatArea-messages">
        {messageContext.messages.length ? (
          <>
            {messageContext.messages.map(message => {
              const filteredMessage = createMessage(message);
              return <Message message={filteredMessage} key={message._id} />;
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
