import React from "react";
import "./ChatControl.css";
import Picker from "emoji-picker-react";

function ChatControl(props) {
  const { name } = props;
  const [chosenEmoji, setChosenEmoji] = React.useState(null);
  const [isEmojiVisible, setIsEmojiVisible] = React.useState(false);
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };
  return (
    <div className="ChatControl">
      <div className="ChatControl-emoji">
        {isEmojiVisible ? <Picker onEmojiClick={onEmojiClick} /> : null}
      </div>
      <div className="ChatControl-input">
        <textarea className="ChatControl-textarea" placeholder={`Message ${name}`}></textarea>
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
    </div>
  );
}

export default ChatControl;
