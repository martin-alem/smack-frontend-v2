import React from "react";

const FriendsContext = React.createContext();

function FriendsContextProvider(props) {
  const [friends, setFriends] = React.useState([]);
  return <FriendsContext.Provider value={{ friends, setFriends }}>{props.children}</FriendsContext.Provider>;
}

export { FriendsContext, FriendsContextProvider };
