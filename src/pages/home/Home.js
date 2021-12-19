import React from "react";
import "./Home.css";
import Navigation from "./../../components/nav/Navigation";
import Chats from "./../../pages/chats/Chats";
import Profile from "./../../pages/profile/Profile";
import Friends from "../../pages/friends/Friends";
import FindFriend from "../find_friend/FindFriend";
import Notifications from "../notifications/Notifications";
import Settings from "../settings/Settings";
import ChatArea from "../chat_area/ChatArea";
import Modal from "../../components/modal/Modal";

function Home() {
  const [currentPage, setPage] = React.useState("chats");
  const chatAreaRef = React.useRef();
  const showChatArea = () => {
    chatAreaRef.current.style.display = "block";
    chatAreaRef.current.style.left = "0";
  };
  const renderPage = arg => {
    if (arg === "chats") {
      return <Chats showChatArea={showChatArea} />;
    } else if (arg === "profile") {
      return <Profile />;
    } else if (arg === "friends") {
      return <Friends />;
    } else if (arg === "find_friends") {
      return <FindFriend />;
    } else if (arg === "notifications") {
      return <Notifications />;
    } else if (arg === "settings") {
      return <Settings />;
    } else {
      return <Chats showChatArea={showChatArea} />;
    }
  };
  return (
    <div className="Home">
      <nav className="Home-nav">
        <Navigation setPage={setPage} />
      </nav>
      <section className="Home-chats">{renderPage(currentPage)}</section>
      <section ref={chatAreaRef} className="Home-chat-area">
        <ChatArea chatAreaRef={chatAreaRef} />
      </section>
      <Modal />
    </div>
  );
}

export default Home;
