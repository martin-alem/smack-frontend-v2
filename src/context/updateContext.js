import React from "react";
import useLocalStorage from "../hook/useLocalStorage";

const UpdateContext = React.createContext();

function UpdateContextProvider(props) {
  const [anyUpdate, setAnyUpdate] = useLocalStorage("smack_any_update", false);
  const [update, setUpdate] = useLocalStorage("smack_userUpdate", {});
  return <UpdateContext.Provider value={{ anyUpdate, setAnyUpdate, update, setUpdate }}>{props.children}</UpdateContext.Provider>;
}

export { UpdateContext, UpdateContextProvider };
