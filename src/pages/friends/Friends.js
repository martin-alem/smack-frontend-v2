import React from "react";
import "./Friends.css";
import SearchInput from "./../../components/search_input/SearchInput";
import Friend from "../../components/friend/Friend";
import Image from "./../../images/user.jpg";

function Friends() {
  const friends = [
    {
      name: "Martin Alemajoh Martin Alemajoh Martin Alemajoh Martin Alemajoh",
      image: Image,
      friends: 567,
    },
    { name: "Martin Alemajoh", image: Image, friends: 567 },
    { name: "Martin Alemajoh", image: Image, friends: 567 },
    { name: "Martin Alemajoh", image: Image, friends: 567 },
    { name: "Martin Alemajoh", image: Image, friends: 567 },
    { name: "Martin Alemajoh", image: Image, friends: 567 },
    { name: "Martin Alemajoh", image: Image, friends: 567 },
    { name: "Martin Alemajoh", image: Image, friends: 567 },
    { name: "Martin Alemajoh", image: Image, friends: 567 },
    { name: "Martin Alemajoh", image: Image, friends: 567 },
    { name: "Martin Alemajoh", image: Image, friends: 567 },
    { name: "Martin Alemajoh", image: Image, friends: 567 },
    { name: "Martin Alemajoh", image: Image, friends: 567 },
    { name: "Martin Alemajoh", image: Image, friends: 567 },
    { name: "Martin Alemajoh", image: Image, friends: 567 },
    { name: "Martin Alemajoh", image: Image, friends: 567 },
    { name: "Martin Alemajoh", image: Image, friends: 567 },
    { name: "Martin Alemajoh", image: Image, friends: 567 },
    { name: "Martin Alemajoh", image: Image, friends: 567 },
    { name: "Martin Alemajoh", image: Image, friends: 567 },
  ];
  return (
    <div className="Friends">
      <div className="Friends-heading">Friends</div>
      <div className="Friends-search">
        <SearchInput placeholder="Search friends" name="friends" />
      </div>
      <div className="Friends-friends">
        {friends.map((friend, index) => {
          return (
            <Friend key={index} name={friend.name} image={friend.image} friends={friend.friends} />
          );
        })}
      </div>
    </div>
  );
}

export default Friends;
