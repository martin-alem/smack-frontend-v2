import React from "react";
import "./CheckBox.css";

function CheckBox(props) {
  const { name, action, label } = props;
  return (
    <label htmlFor="CheckBox" className="CheckBox">
      <input
        type="checkbox"
        className="CheckBox-input"
        name={name}
        onChange={action}
        id="CheckBox"
      />
      <div className="CheckBox-box"></div>
      {label}
    </label>
  );
}

export default CheckBox;
