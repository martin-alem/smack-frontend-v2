import React from "react";
import "./Message.css";
import More from "./../../components/more/More";
import Image from "./../../components/image/Image";
import Media from "../../components/media/Media";
import { formatDate } from "../../utils/util";

function Message(props) {
  const { message } = props;
  const contents = [{ text: "Delete", icon: "delete", action: () => console.log("Delete message") }];

  const generateAttachment = attachment => {
    const { attachmentType, src, name, size } = attachment;
    switch (attachmentType) {
      case "image":
        return <img src={src} alt={name} width={100} height={100} />;

      case "audio":
        return (
          <audio controls>
            <source src={src} type="audio/mpeg" />
          </audio>
        );

      case "video":
        return (
          <video className="Message-video" controls width={200} height={200}>
            <source src={src} type="video/mp4" />
          </video>
        );

      case "file":
        return <Media icon="description" name={name} size={size} src={src} />;
    }
  };
  return (
    <div className={`Message Message-${message.type}`}>
      <div className="Message-container">
        <div className={`Message-box ${message.type}-message`}>
          <p> {message.content}</p>
          <div className="Message-attachment-container">
            {message.attachments.map((attachment, index) => (
              <div key={index} className="Message-attachment">
                {generateAttachment(attachment)}
              </div>
            ))}
          </div>
          <h4 className="Message-time">
            <span className="material-icons-outlined">schedule</span>
            <p>{formatDate(message.time.toString())["time"]}</p>
          </h4>
        </div>
        <More contents={contents} />
      </div>
      <div className="Message-more">
        <div className="Message-owner-image">
          <Image src={message.owner.picture} dimension="40px" alt={message.owner.lastName} />
        </div>
        <div className="Message-details">
          <h3>{`${message.owner.firstName} ${message.owner.lastName}`}</h3>
          {message.type === "outgoing" ? <span className="material-icons-outlined Message-done">done_all</span> : null}
        </div>
      </div>
    </div>
  );
}

export default Message;
