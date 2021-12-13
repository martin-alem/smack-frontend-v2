import React from "react";
import logo from "./../../images/logo.svg";
import "./Logo.css";

function Logo(props) {
  const { type } = props;
  return (
    <div className="Logo">
      {type === "default" ? (
        <img src={logo} alt="logo" className="Logo-logo" />
      ) : (
        <img src={logo} alt="logo" className="Logo-logo" width="50px" height="50px" />
      )}
    </div>
  );
}

export default Logo;
