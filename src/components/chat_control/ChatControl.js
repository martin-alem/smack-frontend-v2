import React from "react";
import "./ChatControl.css";
import Picker from "emoji-picker-react";
import { CurrentChatContext } from "../../context/currentChatContext";

function ChatControl(props) {
  const [chosenEmoji, setChosenEmoji] = React.useState(null);
  const [isEmojiVisible, setIsEmojiVisible] = React.useState(false);
  const currentChatContext = React.useContext(CurrentChatContext);
  const currentChat = currentChatContext.currentChat;
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };
  return (
    <div className="ChatControl">
      {Object.keys(currentChat).length ? (
        <>
          <div className="ChatControl-emoji">{isEmojiVisible ? <Picker onEmojiClick={onEmojiClick} /> : null}</div>
          <div className="ChatControl-input">
            <textarea className="ChatControl-textarea" placeholder={`Message ${currentChat.firstName} ${currentChat.lastName}`}></textarea>
            <span className="material-icons-outlined">send</span>
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
