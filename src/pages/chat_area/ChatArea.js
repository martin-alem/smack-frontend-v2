import React from "react";
import "./ChatArea.css";
import ChatNav from "../../components/chat_nav/ChatNav";
import ChatControl from "../../components/chat_control/ChatControl";
import Image from "./../../images/user.jpg";
import Message from "../../components/message/Message";

function ChatArea(props) {
  const messages = [
    {
      message: {
        content:
          "Hello My name is Martin Alemajoh. This is where the user message will go and every other thing",
        attachments: [],
        time: "12:00",
        type: "incoming",
      },
      owner: { name: "Martin Alemajoh", image: Image },
    },

    {
      message: {
        content:
          "Hello My name is Martin Alemajoh. This is where the user message will go and every other thing",
        attachments: [
          { name: "Photo1.jpg", src: Image, size: 56, attachmentType: "image" },
          { name: "Photo1.jpg", src: Image, size: 56, attachmentType: "image" },
          { name: "Photo1.jpg", src: Image, size: 56, attachmentType: "image" },
          { name: "Photo1.jpg", src: Image, size: 56, attachmentType: "image" },
          { name: "Photo1.jpg", src: Image, size: 56, attachmentType: "image" },
          { name: "Photo1.jpg", src: Image, size: 56, attachmentType: "image" },
        ],
        time: "12:00",
        type: "outgoing",
      },
      owner: { name: "Martin Alemajoh", image: Image },
    },

    {
      message: {
        content:
          "Hello My name is Martin Alemajoh. This is where the user message will go and every other thing",
        attachments: [
          { name: "Photo1.jpg", src: Image, size: 56, attachmentType: "audio" },
          { name: "Photo1.jpg", src: Image, size: 56, attachmentType: "audio" },
        ],
        time: "12:00",
        type: "incoming",
      },
      owner: { name: "Martin Alemajoh", image: Image },
    },

    {
      message: {
        content:
          "Hello My name is Martin Alemajoh. This is where the user message will go and every other thing",
        attachments: [
          { name: "Photo1.jpg", src: Image, size: 56, attachmentType: "video" },
          { name: "Photo1.jpg", src: Image, size: 56, attachmentType: "video" },
        ],
        time: "12:00",
        type: "incoming",
      },
      owner: { name: "Martin Alemajoh", image: Image },
    },

    {
      message: {
        content:
          "Hello My name is Martin Alemajoh. This is where the user message will go and every other thing",
        attachments: [
          { name: "Photo1.jpg", src: Image, size: 56, attachmentType: "file" },
          { name: "Photo1.jpg", src: Image, size: 456, attachmentType: "file" },
        ],
        time: "12:00",
        type: "outgoing",
      },
      owner: { name: "Martin Alemajoh", image: Image },
    },
  ];
  return (
    <div className="ChatArea">
      <div className="ChatArea-nav">
        <ChatNav chatAreaRef={props.chatAreaRef} />
      </div>
      <div className="ChatArea-messages">
        {messages.map((message, index) => {
          return <Message message={message.message} owner={message.owner} key={index} />;
        })}
      </div>
      <div className="ChatArea-controls">
        <ChatControl name="Martin Alemajoh" />
      </div>
    </div>
  );
}

export default ChatArea;
