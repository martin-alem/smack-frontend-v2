import React from "react";
import "./Setup2FA.css";
import Button from "./../../components/button/Button";
import TextInput from "./../../components/text-input/TextInput";
import CheckBox from "./../../components/check_box/CheckBox";
import image from "./../../images/2fa.svg";

function Setup2FA() {
  return (
    <div className="Setup2FA">
      <h1 className="Setup2FA-heading">2-Factor-Auth</h1>
      <div className="Setup2FA-image-container">
        <img className="Setup2FA-image" src={image} alt="2 factor authentication" />
      </div>
      <p className="Setup2FA-message">Enter the code sent the phone number ending in ***5041</p>
      <div className="Setup2FA-input">
        <TextInput
          error={false}
          name="code"
          placeholder="Verification code"
          action={() => {
            console.log("Hi there!");
          }}
        />
      </div>
      <div className="Setup2FA-checkbox">
        <CheckBox
          name="trusted_device"
          label="Add this device as trusted device"
          action={e => {
            console.log(e.target.checked);
          }}
        />
      </div>
      <div className="Setup2FA-button">
        <Button variant="contained" text="Setup 2FA" />
      </div>
      <div className="Setup2FA-info">
        <span className="material-icons icon">info</span>
        <p className="Setup2FA-info-text">
          Devices added as trusted will not go through the verification process when next you sign
          in
        </p>
      </div>
    </div>
  );
}

export default Setup2FA;
