import React from "react";
import "./Chats.css";
import { ChatContext } from "./../../context/chatContext";
import { UserContext } from "../../context/userContext";
import SearchInput from "./../../components/search_input/SearchInput";
import OnlineFriends from "./../../components/online_friends/OnlineFriends";
import Chat from "./../../components/chat/Chat";
import httpAgent from "./../../utils/httpAgent";

function Chats(props) {
  const chatContext = React.useContext(ChatContext);
  const userContext = React.useContext(UserContext);
  const user = userContext.user;
  const { showChatArea } = props;
  const chats = chatContext.chats;
  const limitRef = React.useRef(20);
  const offsetRef = React.useRef(0);
  const rootRef = React.useRef();

  const fetchChats = async () => {
    try {
      const option = {
        headers: { Accept: "application/json" },
        body: null,
      };
      const limit = limitRef.current;
      const offset = offsetRef.current;
      const userId = user._id;
      const serverResponse = await httpAgent("GET", `${process.env.REACT_APP_API}/api/v1/chats/${userId}?limit=${limit}&offset=${offset}`, option);
      const jsonResponse = await serverResponse.json();
      if (serverResponse.ok) {
        const chats = jsonResponse["payload"];
        chatContext.setChats(prevState => {
          return [...prevState, ...chats["result"]];
        });
        return chats["remaining"];
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
      const result = await fetchChats();
      if (result > 0) {
        const chatList = document.querySelectorAll(".Chat");
        const target = chatList[chatList.length - 1];
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
    const chatList = document.querySelectorAll(".Chat");
    if (chatList.length > 0) {
      const target = chatList[chatList.length - 1];
      const interSectionObserver = new IntersectionObserver(callback, options);
      interSectionObserver.observe(target);
    }
  };

  React.useEffect(() => {
    const fetchAsync = async () => {
      await fetchChats();
      infiniteScroll();
      offsetRef.current += 20;
    };
    fetchAsync();
    return () => {
      chatContext.setChats([]);
    };
  }, []);
  return (
    <div className="Chats">
      <div className="Chats-heading">Chats</div>
      <div className="Chats-search-input">
        <SearchInput name="search_input" placeholder="Search messages or users" />
      </div>
      <div className="Chats-online-friends">
        <OnlineFriends showChatArea={showChatArea} />
      </div>

      {chats.length ? (
        <>
          <div className="Chats-heading2">Recent</div>
          <div onClick={showChatArea} className="Chats-recent">
            {chats.map((chat, index) => (
              <Chat key={index} chat={chat} showChatArea={showChatArea} />
            ))}
          </div>
        </>
      ) : (
        <div className="Chats-no-chats">No recent chats found</div>
      )}
    </div>
  );
}

export default Chats;
