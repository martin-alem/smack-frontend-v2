import React from "react";
import "./Home.css";
import Navigation from "./../../components/nav/Navigation";
import Chats from "./../../pages/chats/Chats";
import Profile from "./../../pages/profile/Profile";
import Friends from "../../pages/friends/Friends";

function Home() {
  const [currentPage, setPage] = React.useState("chats");
  const renderPage = arg => {
    if (arg === "chats") {
      return <Chats />;
    } else if (arg === "profile") {
      return <Profile />;
    } else if (arg === "friends") {
      return <Friends />;
    } else {
      return <Chats />;
    }
  };
  return (
    <div className="Home">
      <nav className="Home-nav">
        <Navigation setPage={setPage} />
      </nav>
      <section className="Home-chats">{renderPage(currentPage)}</section>
      <section className="Home-chat-area"></section>
    </div>
  );
}

export default Home;
