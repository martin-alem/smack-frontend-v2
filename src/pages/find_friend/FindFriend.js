import React from "react";
import "./FindFriend.css";
import SearchInput from "./../../components/search_input/SearchInput";
import PeopleYouKnow from "../../components/people_you_know/PeopleYouKnow";
import Image from "./../../images/user.jpg";
import People from "./../../components/people/People";

function FindFriend() {
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
    <div className="FindFriend">
      <div className="FindFriend-heading">
        <h4>Find Friend</h4>
        <span className="material-icons-outlined">person_add</span>
      </div>
      <div className="FindFriend-search">
        <SearchInput name="friends" placeholder="Find new friends" />
      </div>

      <div className="FindFriend-people-know">
        <h4>People you may know</h4>
        <PeopleYouKnow />
      </div>

      <div className="FindFriend-people">
        {friends.map((friend, index) => {
          return (
            <People key={index} name={friend.name} image={friend.image} friends={friend.friends} />
          );
        })}
      </div>
    </div>
  );
}

export default FindFriend;
