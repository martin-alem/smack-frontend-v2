import React from "react";
import "./AnswerCall.css";
import UserImage from "./../../components/user_image/UserImage";
import Image from "./../../images/user.jpg";
import Modal from "./../../components/modal/Modal";

function AnswerCall(props) {
  const { callType, showClose } = props;
  const call = callType === "mic" ? "Audio" : "Video";
  return (
    <Modal showClose={showClose}>
      <div className="AnswerCall">
        <UserImage src={Image} alt="Martin Alemajoh" size="l" showStatus={false} />
        <h4>Martin Alemajoh</h4>
        <p>Martin Wants to start a call with you</p>
        <div className="AnswerCall-action">
          <button type="button" className="AnswerCall-answer">
            <span class="material-icons-outlined">{callType}</span>
          </button>
          <button type="button" className="AnswerCall-reject">
            <span class="material-icons-outlined">close</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default AnswerCall;
