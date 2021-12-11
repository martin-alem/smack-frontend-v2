import React from "react";
import "./Verify.css";
import Button from "./../../components/button/Button";
import TextInput from "./../../components/text-input/TextInput";
import CheckBox from "./../../components/check_box/CheckBox";
import image from "./../../images/verify.svg";

function Verify() {
  return (
    <div className="Verify">
      <h1 className="Verify-heading">Untrusted Device</h1>
      <div className="Verify-image-container">
        <img className="Verify-image" src={image} alt="Untrusted device" />
      </div>
      <p className="Verify-message">Enter the code sent the phone number ending in ***5041</p>
      <div className="Verify-input">
        <TextInput
          error={false}
          name="code"
          placeholder="Verification code"
          action={() => {
            console.log("Hi there!");
          }}
        />
      </div>
      <div className="Verify-checkbox">
        <CheckBox
          name="trusted_device"
          label="Add this device as trusted device"
          action={e => {
            console.log(e.target.checked);
          }}
        />
      </div>
      <div className="Verify-button">
        <Button variant="contained" text="Verify Device" />
      </div>
      <div className="Verify-info">
        <span className="material-icons icon">info</span>
        <p className="Verify-info-text">
          Devices added as trusted will not go through the verification process when next you sign
          in
        </p>
      </div>
    </div>
  );
}

export default Verify;
