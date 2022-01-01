import React from "react";
import "./Setup2FA.css";
import { UserContext } from "../../context/userContext";
import Button from "./../../components/button/Button";
import TextInput from "./../../components/text-input/TextInput";
import CheckBox from "./../../components/check_box/CheckBox";
import image from "./../../images/2fa.svg";
import httpAgent from "./../../utils/httpAgent";

function Setup2FA() {
  const userContext = React.useContext(UserContext);
  const user = userContext.user;
  const [code, setCode] = React.useState("");
  const [addTrustedDevice, setAddTrustedDevice] = React.useState(false);
  const [enablingTFA, setEnablingTFA] = React.useState(false);

  const handleCodeChange = e => {
    setCode(e.target.value);
  };

  const handleDeviceChange = e => {
    setAddTrustedDevice(e.target.checked);
  };
  const enableTwoFA = async () => {
    if (!validateCode(code)) return console.error("Please enter the code sent to you");
    try {
      setEnablingTFA(true);
      const option = {
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ code: code, device: addTrustedDevice, userId: user._id, phoneNumber: user.phoneNumber }),
      };
      const serverResponse = await httpAgent("POST", `${process.env.REACT_APP_API}/api/v1/twoFA`, option);
      const jsonResponse = await serverResponse.json();
      if (serverResponse.ok) {
        await logoutUser();
      } else {
        console.log(jsonResponse);
      }
    } catch (error) {
      console.log(error);
    }
    setEnablingTFA(false);
  };

  const logoutUser = async () => {
    try {
      const option = {
        headers: { Accept: "application/json" },
        body: null,
      };
      const serverResponse = await httpAgent("GET", `${process.env.REACT_APP_API}/api/v1/logout`, option);
      if (serverResponse.ok) {
        localStorage.clear();
        window.location.replace("/");
      } else {
        console.log(serverResponse);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validateCode = code => {
    return code.length > 0;
  };
  return (
    <div className="Setup2FA">
      <h1 className="Setup2FA-heading">2-Factor-Auth</h1>
      <div className="Setup2FA-image-container">
        <img className="Setup2FA-image" src={image} alt="2 factor authentication" />
      </div>
      <p className="Setup2FA-message">Enter the code sent the phone number ending in ***5041</p>
      <div className="Setup2FA-input">
        <TextInput error={false} name="code" placeholder="Verification code" action={handleCodeChange} />
      </div>
      <div className="Setup2FA-checkbox">
        <CheckBox name="trusted_device" label="Add this device as trusted device" action={handleDeviceChange} />
      </div>
      <div className="Setup2FA-button">
        <Button variant="primary" size="m" text="Setup 2FA" action={enableTwoFA} loading={enablingTFA} />
      </div>
      <div className="Setup2FA-info">
        <span className="material-icons icon">info</span>
        <p className="Setup2FA-info-text">Devices added as trusted will not go through the verification process when next you sign in</p>
      </div>
    </div>
  );
}

export default Setup2FA;
