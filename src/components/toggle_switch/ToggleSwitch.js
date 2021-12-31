import React from "react";
import "./ToggleSwitch.css";
import { SettingContext } from "./../../context/settingContext";
import { UpdateContext } from "./../../context/updateContext";

function ToggleSwitch(props) {
  const settingContext = React.useContext(SettingContext);
  const updateContext = React.useContext(UpdateContext);
  const userSettings = settingContext.userSetting["settings"];
  const { name, type, state } = props;
  const [value, setValue] = React.useState(state);
  const handleChange = () => {
    setValue(!value);
    switch (name) {
      case "status":
        userSettings["hideStatus"] = !value;
        break;
      case "profile":
        userSettings["hidePicture"] = !value;
        break;
      case "read-receipt":
        userSettings["hideReadReceipt"] = !value;
        break;
      case "2fa":
        userSettings["twoFA"] = !value;
    }
    updateContext.setAnyUpdate(true);
    updateContext.setUpdate(prevState => {
      return {
        ...prevState,
        settings: userSettings,
      };
    });
    settingContext.setUserSetting(prevState => {
      return {
        ...prevState,
        settings: userSettings,
      };
    });
  };
  return (
    <div className="ToggleSwitch">
      <label className="ToggleSwitch-label" htmlFor={type}>
        <input className="ToggleSwitch-input" type="checkbox" name={name} id={type} checked={value} onChange={handleChange} />
        <div className="ToggleSwitch-switch"></div>
      </label>
    </div>
  );
}

export default ToggleSwitch;
