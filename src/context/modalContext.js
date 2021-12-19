import React from "react";

const ModalContext = React.createContext();

function ModalContextProvider(props) {
  const [answerCall, setAnswerCall] = React.useState(false);
  const [showProfile, setShowProfile] = React.useState(false);
  return (
    <ModalContext.Provider value={{ answerCall, setAnswerCall, showProfile, setShowProfile }}>
      {props.children}
    </ModalContext.Provider>
  );
}

export { ModalContext, ModalContextProvider };
