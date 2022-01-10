import React from "react";
import "./ChatControl.css";
import Picker from "emoji-picker-react";
import { CurrentChatContext } from "../../context/currentChatContext";
import { UserContext } from "../../context/userContext";
import { SocketContext } from "../../context/socketContext";

function ChatControl(props) {
  const userContext = React.useContext(UserContext);
  const user = userContext.user;
  const socketContext = React.useContext(SocketContext);
  const socket = socketContext.socket;
  const [textMessage, setTextMessage] = React.useState("");
  const [chosenEmoji, setChosenEmoji] = React.useState(null);
  const [isEmojiVisible, setIsEmojiVisible] = React.useState(false);
  const currentChatContext = React.useContext(CurrentChatContext);
  const currentChat = currentChatContext.currentChat;
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  const handleTextMessageChange = e => {
    const textMessage = e.target.value;
    setTextMessage(textMessage);
  };

  const sendMessage = () => {
    const payload = {
      sender: {
        firstName: user.firstName,
        lastName: user.lastName,
        picture: user.picture,
        userId: user._id,
      },
      recipient: {
        userId: currentChat._id,
        firstName: currentChat.firstName,
        lastName: currentChat.lastName,
        email: currentChat.email,
      },
      message: {
        text: textMessage,
        media: [],
        type: "text",
      },
    };
    socket.emit("message", payload);
    setTextMessage("");
  };

  React.useEffect(() => {
    socket.on("incoming_message", data => {
      console.log(data);
    });

    socket.on("send_response", data => {
      console.log(data);
    });

    socket.on("send_error", data => {
      console.log(data);
    });
  }, []);
  return (
    <div className="ChatControl">
      {Object.keys(currentChat).length ? (
        <>
          <div className="ChatControl-emoji">{isEmojiVisible ? <Picker onEmojiClick={onEmojiClick} /> : null}</div>
          <div className="ChatControl-input">
            <textarea value={textMessage} onChange={handleTextMessageChange} className="ChatControl-textarea" placeholder={`Message ${currentChat.firstName} ${currentChat.lastName}`}></textarea>
            <span onClick={sendMessage} className="material-icons-outlined">
              send
            </span>
          </div>
          <div className="ChatControl-actions">
            <span className="material-icons-outlined">photo_camera</span>
            <span className="material-icons-outlined">mic</span>
            <span
              onClick={() => {
                setIsEmojiVisible(!isEmojiVisible);
              }}
              className="material-icons-outlined"
            >
              emoji_emotions
            </span>
            <span className="material-icons-outlined">attachment</span>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default ChatControl;
