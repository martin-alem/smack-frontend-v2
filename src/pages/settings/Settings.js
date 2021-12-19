import React from "react";
import "./Settings.css";
import ImageUpload from "../../components/image_upload/ImageUpload";
import Accordion from "./../../components/accordion/Accordion";
import TextInput from "./../../components/text-input/TextInput";
import TextArea from "../../components/textarea/TextArea";
import ToggleSwitch from "../../components/toggle_switch/ToggleSwitch";

function Settings() {
  return (
    <div className="Settings">
      <div className="Settings-heading">Settings</div>

      <div className="Settings-photo">
        <div className="Settings-info">
          <ImageUpload />
          <h3>
            Martin Alemajoh Martin Alemajoh Martin Alemajoh Martin Alemajoh Martin Alemajoh Martin
            Alemajoh
          </h3>
        </div>
      </div>

      <div className="Settings-personal-settings">
        <Accordion name="personal-setting" title="Personal Info" icon="person" type="personal-info">
          <TextInput name="tel" placeholder="Update phone number" />
          <TextArea />
        </Accordion>

        <Accordion name="personal-settings" title="Privacy" icon="lock_open" type="privacy">
          <div className="Settings-privacy Settings-status">
            <p>Online Status</p>
            <ToggleSwitch name="status" type="status" />
          </div>
          <div className="Settings-privacy Settings-profile">
            <p>Profile Picture</p>
            <ToggleSwitch name="profile" type="profile" />
          </div>
        </Accordion>

        <Accordion name="personal-settings" title="Security" icon="security" type="security">
          <div className="Settings-security Settings-2fa">
            <p>Enable 2FA</p>
            <ToggleSwitch name="2fa" type="2fa" />
          </div>
        </Accordion>
      </div>
    </div>
  );
}

export default Settings;
