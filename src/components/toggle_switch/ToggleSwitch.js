import React from "react";
import "./ToggleSwitch.css";

function ToggleSwitch(props) {
  const { name, type, state, action } = props;
  return (
    <div className="ToggleSwitch">
      <label className="ToggleSwitch-label" htmlFor={type}>
        <input className="ToggleSwitch-input" type="checkbox" name={name} id={type} defaultChecked={state} onChange={action} />
        <div className="ToggleSwitch-switch"></div>
      </label>
    </div>
  );
}

export default ToggleSwitch;
