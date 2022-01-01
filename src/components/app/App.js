import React from "react";
import { ModalContextProvider } from "./../../context/modalContext";
import { UserContextProvider } from "./../../context/userContext";
import { SettingContextProvider } from "./../../context/settingContext";
import { UpdateContextProvider } from "./../../context/updateContext";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./../../components/protected_route/ProtectedRoute";
import Login from "../../pages/login/Login";
import Setup2FA from "../../pages/setup-2fa/Setup2FA";
import Verify from "../../pages/verify/Verify";
import NotFound from "../../pages/404/404";
import Home from "../../pages/home/Home";
import "./App.css";

function App() {
  return (
    <div className="App">
      <UpdateContextProvider>
        <SettingContextProvider>
          <UserContextProvider>
            <ModalContextProvider>
              <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/setup_2fa" exact component={Setup2FA} />
                <Route path="/verify_device" exact component={Verify} />
                <ProtectedRoute path="/home" exact component={Home} />
                <Route component={NotFound} />
              </Switch>
            </ModalContextProvider>
          </UserContextProvider>
        </SettingContextProvider>
      </UpdateContextProvider>
    </div>
  );
}

export default App;
