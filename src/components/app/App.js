import React from "react";
import { ModalContextProvider } from "./../../context/modalContext";
import { Route, Routes } from "react-router-dom";
import Login from "../../pages/login/Login";
import Setup2FA from "../../pages/setup-2fa/Setup2FA";
import Verify from "../../pages/verify/Verify";
import Home from "../../pages/home/Home";
import "./App.css";

function App() {
  return (
    <div className="App">
      <ModalContextProvider>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/setup-2fa" exact element={<Setup2FA />} />
          <Route path="/verify_device" exact element={<Verify />} />
          <Route path="/home" exact element={<Home />} />
        </Routes>
      </ModalContextProvider>
    </div>
  );
}

export default App;
