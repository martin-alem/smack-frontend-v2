import React from "react";
import "./Setup2FA.css";
import Button from "./../../components/button/Button";
import TextInput from "./../../components/text-input/TextInput";

function Setup2FA() {
  return (
    <div className="Setup2FA">
      {/* <Button
        variant="contained"
        text="Setup 2FA"
        action={() => {
          console.log("I was clicked");
        }}
      /> */}
      <TextInput
        name="code"
        placeholder="Verification code"
        action={() => {
          console.log("Hi there!");
        }}
      />
    </div>
  );
}

export default Setup2FA;
