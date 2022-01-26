import React from "react";
import useLocalStorage from "../hook/useLocalStorage";

const ModalContext = React.createContext();

function ModalContextProvider(props) {
  const [answerCall, setAnswerCall] = React.useState(false);
  const [showProfile, setShowProfile] = React.useState(false);
  const [currentProfile, setCurrentProfile] = React.useState({});
  const [modalData, setModalData] = useLocalStorage("call_data", {})
  return <ModalContext.Provider value={{ answerCall, setAnswerCall, showProfile, setShowProfile, currentProfile, setCurrentProfile, modalData, setModalData }}>{props.children}</ModalContext.Provider>;
}

export { ModalContext, ModalContextProvider };
