import React from "react";
import useLocalStorage from "../hook/useLocalStorage";

const UserContext = React.createContext();

function UserContextProvider(props) {
  const [user, setUser] = useLocalStorage("smack_user", {});
  return <UserContext.Provider value={{ user, setUser }}>{props.children}</UserContext.Provider>;
}

export { UserContext, UserContextProvider };
