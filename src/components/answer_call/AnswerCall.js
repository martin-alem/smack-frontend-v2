import React from "react";
import "./AnswerCall.css";
import UserImage from "./../../components/user_image/UserImage";
import Image from "./../../images/user.jpg";
import Modal from "./../../components/modal/Modal";

function AnswerCall(props) {
  const { callType, showClose, opened } = props;

  return (
    <Modal showClose={showClose} opened={opened}>
      <div className="AnswerCall">
        <UserImage src={Image} alt="Martin Alemajoh" size="l" showStatus={false} />
        <h4>Martin Alemajoh</h4>
        <p>Martin Wants to start a call with you</p>
        <div className="AnswerCall-action">
          <button type="button" className="AnswerCall-answer">
            <span className="material-icons-outlined">{callType}</span>
          </button>
          <button type="button" className="AnswerCall-reject">
            <span className="material-icons-outlined">close</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default AnswerCall;
