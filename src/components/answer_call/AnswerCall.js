import React from "react";
import "./AnswerCall.css";
import { SocketContext } from "../../context/socketContext";
import UserImage from "./../../components/user_image/UserImage";
import Modal from "./../../components/modal/Modal";
import { ModalContext } from "./../../context/modalContext";

function AnswerCall(props) {
  const { showClose, opened, caller } = props;
  const socketContext = React.useContext(SocketContext);
  const socket = socketContext.socket;
  const modalContext = React.useContext(ModalContext);
  const { setAnswerCall, modalData} = modalContext;

  const acceptCall = () => {
    setAnswerCall(false);
    const payload = {
      userId: modalData.callerId,
      firstName: modalData.firstName,
      lastName: modalData.lastName,
      picture: modalData.picture,
    };
    socket.emit("answer_call", payload);
    window.location.replace("/call_room");
  };

  const rejectCall = () => {
    setAnswerCall(false);
    const payload = {
      userId: modalData.callerId,
      firstName: modalData.firstName,
      lastName: modalData.lastName,
      picture: modalData.picture,
    };

    socket.emit("reject_call", payload);
  };

  return (
    <Modal showClose={showClose} opened={opened}>
      <div className="AnswerCall">
        <UserImage src={caller.picture} alt="Martin Alemajoh" size="l" showStatus={false} />
        <h4>
          {caller.firstName} {caller.lastName}
        </h4>
        <p>{caller.firstName} Wants to start a call with you</p>
        <div className="AnswerCall-action">
          <button onClick={acceptCall} type="button" className="AnswerCall-answer">
            <span className="material-icons-outlined">phone_enabled</span>
          </button>
          <button onClick={rejectCall} type="button" className="AnswerCall-reject">
            <span className="material-icons-outlined">close</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default AnswerCall;
