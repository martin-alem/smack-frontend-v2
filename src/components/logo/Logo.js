import React from "react";
import logo from "./../../images/logo.svg";
import "./Logo.css";

function Logo() {
  return (
    <div className="Logo">
      <img src={logo} alt="logo" className="Logo-logo" />
    </div>
  );
}

export default Logo;
