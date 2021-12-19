import React from "react";
import { ModalContextProvider } from "./../../context/modalContext";
import Login from "../../pages/login/Login";
import Setup2FA from "../../pages/setup-2fa/Setup2FA";
import Verify from "../../pages/verify/Verify";
import Home from "../../pages/home/Home";
import "./App.css";

function App() {
  return (
    <ModalContextProvider>
      <div className="App">
        <Home />
        {/* <Login /> */}
        {/* <Setup2FA /> */}
        {/* <Verify /> */}
      </div>
    </ModalContextProvider>
  );
}

export default App;
