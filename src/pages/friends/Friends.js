import React from "react";
import "./Friends.css";
import { UserContext } from "./../../context/userContext";
import { FriendsContext } from "./../../context/friendsContext";
import SearchInput from "./../../components/search_input/SearchInput";
import Friend from "../../components/friend/Friend";
import httpAgent from "./../../utils/httpAgent";

function Friends(props) {
  const { showChatArea } = props;
  const userContext = React.useContext(UserContext);
  const user = userContext.user;
  const friendsContext = React.useContext(FriendsContext);
  const friends = friendsContext.friends;
  const limitRef = React.useRef(20);
  const offsetRef = React.useRef(0);
  const queryRef = React.useRef("");
  const rootRef = React.useRef();

  const fetchFriends = async () => {
    try {
      const option = {
        headers: { Accept: "application/json" },
        body: null,
      };
      const limit = limitRef.current;
      const offset = offsetRef.current;
      const query = queryRef.current;
      const userId = user._id;
      const serverResponse = await httpAgent("GET", `${process.env.REACT_APP_API}/api/v1/friends/${userId}?q=${query}&limit=${limit}&offset=${offset}`, option);
      const jsonResponse = await serverResponse.json();
      if (serverResponse.ok) {
        const friends = jsonResponse["payload"];
        friendsContext.setFriends(prevState => {
          return [...prevState, ...friends["result"]];
        });
        return friends["remaining"];
      } else {
        console.log(jsonResponse);
      }
    } catch (error) {
      console.log(error);
    }
    return 0;
  };

  const callback = async (entries, observer) => {
    if (entries[0].isIntersecting) {
      observer.unobserve(entries[0].target);
      const result = await fetchFriends();
      if (result > 0) {
        const friendList = document.querySelectorAll(".Friend");
        const target = friendList[friendList.length - 1];
        observer.observe(target);
        offsetRef.current += 20;
      }
    }
  };

  const infiniteScroll = () => {
    const options = {
      root: rootRef.current,
      threshold: 1.0,
    };
    const friendList = document.querySelectorAll(".Friend");
    if (friendList.length > 0) {
      const target = friendList[friendList.length - 1];
      const interSectionObserver = new IntersectionObserver(callback, options);
      interSectionObserver.observe(target);
    }
  };

  React.useEffect(() => {
    const fetchAsync = async () => {
      await fetchFriends();
      infiniteScroll();
      offsetRef.current += 20;
    };
    fetchAsync();
    return () => {
      friendsContext.setFriends([]);
    };
  }, []);
  return (
    <div className="Friends">
      <div className="Friends-heading">Friends</div>
      <div className="Friends-search">
        <SearchInput placeholder="Search friends" name="friends" />
      </div>
      <div ref={rootRef} className="Friends-friends">
        {friends.map(friend => {
          if (friend.status === "active") {
            return <Friend key={friend._id} friend={friend} showChatArea={showChatArea} />;
          }
        })}
      </div>
    </div>
  );
}

export default Friends;
