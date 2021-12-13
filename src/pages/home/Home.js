import React from "react";
import "./Home.css";
import Navigation from "./../../components/nav/Navigation";

function Home() {
  return (
    <div className="Home">
      <nav className="Home-nav">
        <Navigation />
      </nav>
      <section className="Home-chats"></section>
      <section className="Home-chat-area"></section>
    </div>
  );
}

export default Home;
