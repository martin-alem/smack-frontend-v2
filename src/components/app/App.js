import React from "react";
import { ModalContextProvider } from "./../../context/modalContext";
import { UserContextProvider } from "./../../context/userContext";
import { SettingContextProvider } from "./../../context/settingContext";
import { UpdateContextProvider } from "./../../context/updateContext";
import { FriendsContextProvider } from "./../../context/friendsContext";
import { PeopleContextProvider } from "./../../context/peopleContext";
import { NotificationContextProvider } from "./../../context/notificationContext";
import { ChatContextProvider } from "./../../context/chatContext";
import { CurrentChatContextProvider } from "./../../context/currentChatContext";
import { MessageContextProvider } from "./../../context/messageContext";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./../../components/protected_route/ProtectedRoute";
import Login from "../../pages/login/Login";
import Setup2FA from "../../pages/setup-2fa/Setup2FA";
import NotFound from "../../pages/404/404";
import Home from "../../pages/home/Home";
import "./App.css";

function App() {
  return (
    <div className="App">
      <UpdateContextProvider>
        <SettingContextProvider>
          <UserContextProvider>
            <FriendsContextProvider>
              <PeopleContextProvider>
                <NotificationContextProvider>
                  <ChatContextProvider>
                    <CurrentChatContextProvider>
                      <MessageContextProvider>
                        <ModalContextProvider>
                          <Switch>
                            <Route path="/" exact component={Login} />
                            <Route path="/setup_2fa" exact component={Setup2FA} />
                            <ProtectedRoute path="/home" exact component={Home} />
                            <Route component={NotFound} />
                          </Switch>
                        </ModalContextProvider>
                      </MessageContextProvider>
                    </CurrentChatContextProvider>
                  </ChatContextProvider>
                </NotificationContextProvider>
              </PeopleContextProvider>
            </FriendsContextProvider>
          </UserContextProvider>
        </SettingContextProvider>
      </UpdateContextProvider>
    </div>
  );
}

export default App;
