import React from "react";
import Logo from "./../../components/logo/Logo";
import GoogleLogin from "react-google-login";
import "./Login.css";

function Login() {
  const onSuccess = response => {
    console.log(response);
  };

  const onFailure = error => {
    console.log(error);
  };
  return (
    <div className="Login">
      <Logo />
      <h1 className="Login-heading">Sign in</h1>
      <h5 className="Login-sub-heading">Sign in to continue with smack</h5>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Continue With Your Google Account"
        onSuccess={onSuccess}
        onFailure={onFailure}
        theme="dark"
        responseType="token"
        cookiePolicy={"single_host_origin"}
      />
      <p className="Login-tag">&copy;smack</p>
    </div>
  );
}

export default Login;
