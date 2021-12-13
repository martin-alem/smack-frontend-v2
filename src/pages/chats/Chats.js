import React from "react";
import "./Chats.css";
import SearchInput from "./../../components/search_input/SearchInput";
import OnlineFriends from "./../../components/online_friends/OnlineFriends";
import Image from "./../../images/user.jpg";
import Chat from "./../../components/chat/Chat";

function Chats() {
  const chats = [
    {
      image: Image,
      name: "Martin Alemajoh",
      lastMessage: "Hi bro hope you ok?",
      time: "11:23",
      unread: 2,
      status: "online",
    },
    {
      image: Image,
      name: "Martin Alemajoh",
      lastMessage: "Hi bro hope you ok?",
      time: "11:23",
      unread: 2,
      status: "online",
    },
    {
      image: Image,
      name: "Martin Alemajoh",
      lastMessage: "Hi bro hope you ok?",
      time: "11:23",
      unread: 2,
      status: "online",
    },
    {
      image: Image,
      name: "Martin Alemajoh",
      lastMessage: "Hi bro hope you ok?",
      time: "11:23",
      unread: 2,
      status: "online",
    },
    {
      image: Image,
      name: "Martin Alemajoh",
      lastMessage: "Hi bro hope you ok?",
      time: "11:23",
      unread: 2,
      status: "online",
    },
    {
      image: Image,
      name: "Martin Alemajoh",
      lastMessage: "Hi bro hope you ok?",
      time: "11:23",
      unread: 2,
      status: "online",
    },
    {
      image: Image,
      name: "Martin Alemajoh",
      lastMessage: "Hi bro hope you ok?",
      time: "11:23",
      unread: 2,
      status: "online",
    },
    {
      image: Image,
      name: "Martin Alemajoh",
      lastMessage: "Hi bro hope you ok?",
      time: "11:23",
      unread: 2,
      status: "online",
    },
  ];
  return (
    <div className="Chats">
      <div className="Chats-heading">Chats</div>
      <div className="Chats-search-input">
        <SearchInput name="search_input" placeholder="Search messages or users" />
      </div>
      <div className="Chats-online-friends">
        <OnlineFriends />
      </div>

      <div className="Chats-heading2">Recent</div>
      <div className="Chats-recent">
        {chats.map((chat, index) => (
          <Chat
            Image={chat.image}
            name={chat.name}
            lastMessage={chat.lastMessage}
            time={chat.time}
            unread={chat.unread}
            status={chat.status}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default Chats;
