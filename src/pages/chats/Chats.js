import React from "react";
import "./Chats.css";
import SearchInput from "./../../components/search_input/SearchInput";
import OnlineFriends from "./../../components/online_friends/OnlineFriends";

function Chats() {
  return (
    <div className="Chats">
      <div className="Chats-heading">Chats</div>
      <div className="Chats-search-input">
        <SearchInput name="search_input" placeholder="Search messages or users" />
      </div>
      <div className="Chats-online-friends">
        <OnlineFriends />
      </div>
    </div>
  );
}

export default Chats;
