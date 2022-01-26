import React from "react";

const ModalContext = React.createContext();

function ModalContextProvider(props) {
  const [answerCall, setAnswerCall] = React.useState(false);
  const [showProfile, setShowProfile] = React.useState(false);
  const [currentProfile, setCurrentProfile] = React.useState({});
  const [modalData, setModalData] = React.useState({});
  return <ModalContext.Provider value={{ answerCall, setAnswerCall, showProfile, setShowProfile, currentProfile, setCurrentProfile, modalData, setModalData }}>{props.children}</ModalContext.Provider>;
}

export { ModalContext, ModalContextProvider };
