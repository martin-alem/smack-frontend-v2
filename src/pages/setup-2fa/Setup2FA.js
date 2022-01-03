import React from "react";
import "./Setup2FA.css";
import { UserContext } from "../../context/userContext";
import Button from "./../../components/button/Button";
import TextInput from "./../../components/text-input/TextInput";
import image from "./../../images/2fa.svg";
import httpAgent from "./../../utils/httpAgent";
import Toast from "./../../components/toast/Toast";

function Setup2FA() {
  const userContext = React.useContext(UserContext);
  const user = userContext.user;
  const [code, setCode] = React.useState("");
  const [enablingTFA, setEnablingTFA] = React.useState(false);
  const [error, setError] = React.useState({ type: "info", display: false, text: "" });

  const handleCodeChange = e => {
    setCode(e.target.value);
  };

  const enableTwoFA = async () => {
    if (!validateCode(code)) return setError({ type: "error", display: true, text: "Please provide the code sent to your phone" });
    try {
      setEnablingTFA(true);
      const option = {
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ code: code, userId: user._id, phoneNumber: user.phoneNumber }),
      };
      const serverResponse = await httpAgent("POST", `${process.env.REACT_APP_API}/api/v1/twoFA`, option);
      const jsonResponse = await serverResponse.json();
      if (serverResponse.ok) {
        await logoutUser();
      } else {
        if (jsonResponse["code"] === "ECE") setError({ type: "error", display: true, text: "The verification code you provided as expired. Request for new one." });
        if (jsonResponse["code"] === "EIC") setError({ type: "error", display: true, text: "You have provided and invalid verification. Check your code again" });
        if (jsonResponse["code"] === "EIP") setError({ type: "error", display: true, text: "The phone number associated with this verification does not match our records" });
      }
    } catch (error) {
      setError({ type: "error", display: true, text: "An error occurred. Please try again later." });
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
        setError({ type: "error", display: true, text: "An error occurred. Please try again later." });
      }
    } catch (error) {
      setError({ type: "error", display: true, text: "An error occurred. Please try again later." });
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
      <div className="Setup2FA-button">
        <Button variant="primary" size="m" text="Setup 2FA" action={enableTwoFA} loading={enablingTFA} />
      </div>
      <div className="Setup2FA-info">
        <span className="material-icons icon">info</span>
        <p className="Setup2FA-info-text">Setting up two factor authentication helps to protect your account from malicious activities</p>
      </div>
      <Toast error={error} setError={setError} />
    </div>
  );
}

export default Setup2FA;
