import React from "react";
import "./Setup2FA.css";
import Button from "./../../components/button/Button";

function Setup2FA() {
  return (
    <div className="Setup2FA">
      <Button
        variant="contained"
        text="Setup 2FA"
        action={() => {
          console.log("I was clicked");
        }}
      />
    </div>
  );
}

export default Setup2FA;
