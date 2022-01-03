import React from "react";
import "./Settings.css";
import { SettingContext } from "./../../context/settingContext";
import { UpdateContext } from "./../../context/updateContext";
import { UserContext } from "../../context/userContext";
import useLocalStorage from "./../../hook/useLocalStorage";
import ImageUpload from "../../components/image_upload/ImageUpload";
import Accordion from "./../../components/accordion/Accordion";
import TextInput from "./../../components/text-input/TextInput";
import TextArea from "../../components/textarea/TextArea";
import ToggleSwitch from "../../components/toggle_switch/ToggleSwitch";
import Button from "../../components/button/Button";
import httpAgent from "./../../utils/httpAgent";

function Settings() {
  const settingContext = React.useContext(SettingContext);
  const updateContext = React.useContext(UpdateContext);
  const userContext = React.useContext(UserContext);
  const user = userContext.user;
  const userSettings = settingContext.userSetting["settings"];

  const { hidePicture, hideStatus, hideReadReceipt, twoFA } = settingContext.userSetting.settings;
  const [picture, setPicture] = React.useState(hidePicture);
  const [status, setStatus] = React.useState(hideStatus);
  const [readReceipt, setReadReceipt] = React.useState(hideReadReceipt);
  const [TFA, setTwoFA] = React.useState(twoFA);
  const [phone, setPhone] = React.useState(user.phoneNumber);
  const [story, setStory] = React.useState(user.story);
  const [submittingChanges, setSubmittingChanges] = React.useState(false);
  const [anyPersonalChanges, setAnyPersonalChanges] = useLocalStorage("smack_any_personal_changes", false);

  const handlePhoneUpdate = e => {
    setPhone(e.target.value);
    setAnyPersonalChanges(true);
  };

  const handleStoryUpdate = e => {
    setStory(e.target.value);
    setAnyPersonalChanges(true);
  };

  const handleStatusUpdate = e => {
    setStatus(e.target.checked);
    userSettings["hideStatus"] = e.target.checked;
    settingContext.setUserSetting(prevState => {
      return {
        ...prevState,
        settings: userSettings,
      };
    });

    updateContext.setUpdate(prevState => {
      return {
        ...prevState,
        settings: userSettings,
      };
    });
    updateContext.setAnyUpdate(true);
  };

  const handlePictureUpdate = e => {
    setPicture(e.target.checked);
    userSettings["hidePicture"] = e.target.checked;
    settingContext.setUserSetting(prevState => {
      return {
        ...prevState,
        settings: userSettings,
      };
    });

    updateContext.setUpdate(prevState => {
      return {
        ...prevState,
        settings: userSettings,
      };
    });
    updateContext.setAnyUpdate(true);
  };

  const handleReadReceiptUpdate = e => {
    setReadReceipt(e.target.checked);
    userSettings["hideReadReceipt"] = e.target.checked;
    settingContext.setUserSetting(prevState => {
      return {
        ...prevState,
        settings: userSettings,
      };
    });

    updateContext.setUpdate(prevState => {
      return {
        ...prevState,
        settings: userSettings,
      };
    });
    updateContext.setAnyUpdate(true);
  };

  const handleTwoFAUpdate = async e => {
    setTwoFA(e.target.checked);
    if (!TFA) {
      if (!user["phoneNumber"]) return console.error("Please update your phone number");
      const codeReceived = await getVerificationCode(user["phoneNumber"]);
      if (!codeReceived) return console.error("Unable to send a verification code");
    } else {
      userSettings["twoFA"] = !TFA;
      settingContext.setUserSetting(prevState => {
        return {
          ...prevState,
          settings: userSettings,
        };
      });

      updateContext.setUpdate(prevState => {
        return {
          ...prevState,
          settings: userSettings,
        };
      });
      updateContext.setAnyUpdate(true);
    }
  };

  const submitPersonalChanges = () => {
    if (!validatePhone()) return console.error("Invalid phone number");
    updateContext.setUpdate(prevState => {
      return {
        ...prevState,
        user: { phoneNumber: phone, story: story },
      };
    });

    userContext.setUser(prevState => {
      return {
        ...prevState,
        phoneNumber: phone,
        story: story,
      };
    });

    setAnyPersonalChanges(false);
    updateContext.setAnyUpdate(true);
  };

  const validatePhone = () => {
    if (phone.length < 10 || phone.length > 10) {
      return false;
    } else {
      return true;
    }
  };

  const submitUpdate = async () => {
    try {
      const option = {
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(updateContext.update),
      };
      setSubmittingChanges(true);
      const serverResponse = await httpAgent("PUT", `${process.env.REACT_APP_API}/api/v1/settings/${user._id}`, option);
      const jsonResponse = await serverResponse.json();
      if (serverResponse.ok) {
        console.log(jsonResponse);
      } else {
        console.log(jsonResponse);
      }
    } catch (error) {
      console.log(error);
    }
    updateContext.setAnyUpdate(false);
    setSubmittingChanges(false);
  };

  const getVerificationCode = async phone => {
    try {
      const option = {
        headers: { Accept: "application/json" },
        body: null,
      };
      const serverResponse = await httpAgent("GET", `${process.env.REACT_APP_API}/api/v1/code/${user._id}/${phone}`, option);
      if (serverResponse.ok) {
        window.location.assign("/setup_2fa");
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  return (
    <div className="Settings">
      <div className="Settings-heading">
        <h4>Settings</h4>
        {updateContext.anyUpdate ? <Button variant="primary" size="m" text="Save Changes" action={submitUpdate} loading={submittingChanges} /> : null}
      </div>

      <div className="Settings-photo">
        <div className="Settings-info">
          <ImageUpload />
          <h3>Martin Alemajoh</h3>
        </div>
      </div>

      <div className="Settings-personal-settings">
        <Accordion name="personal-setting" title="Personal Info" icon="person" type="personal-info">
          <TextInput name="tel" placeholder="Update phone number" action={handlePhoneUpdate} value={phone} />
          <TextArea name="story" placeholder="What's your story" action={handleStoryUpdate} value={story} />
          {anyPersonalChanges ? <Button variant="primary" size="m" text="Confirm changes" action={submitPersonalChanges} /> : null}
        </Accordion>

        <Accordion name="personal-settings" title="Privacy" icon="lock_open" type="privacy">
          <div className="Settings-privacy Settings-status">
            <p>Hide Online Status</p>
            <ToggleSwitch name="status" type="status" state={status} action={handleStatusUpdate} />
          </div>
          <div className="Settings-privacy Settings-profile">
            <p>Hide Profile Picture</p>
            <ToggleSwitch name="profile" type="profile" state={picture} action={handlePictureUpdate} />
          </div>
          <div className="Settings-privacy Settings-read-receipt">
            <p>Hide Read Receipt</p>
            <ToggleSwitch name="read-receipt" type="read-receipt" state={readReceipt} action={handleReadReceiptUpdate} />
          </div>
        </Accordion>

        <Accordion name="personal-settings" title="Security" icon="security" type="security">
          <div className="Settings-security Settings-2fa">
            <p>Enable 2FA</p>
            {user.phoneNumber ? <ToggleSwitch name="2fa" type="2fa" state={TFA} action={handleTwoFAUpdate} /> : <p style={{ color: "#c92432" }}>provide phone number</p>}
          </div>
        </Accordion>
      </div>
    </div>
  );
}

export default Settings;
