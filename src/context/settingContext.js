import React from "react";
import useLocalStorage from "../hook/useLocalStorage";

const SettingContext = React.createContext();

function SettingContextProvider(props) {
  const [userSetting, setUserSetting] = useLocalStorage("smack_userSetting_setting", {});
  return <SettingContext.Provider value={{ userSetting, setUserSetting }}>{props.children}</SettingContext.Provider>;
}

export { SettingContext, SettingContextProvider };
