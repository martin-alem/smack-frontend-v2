import React from "react";
import "./ShowProfile.css";
import { ModalContext } from "./../../context/modalContext";
import Modal from "../modal/Modal";
import UserImage from "../../components/user_image/UserImage";

function ShowProfile(props) {
  const modalContext = React.useContext(ModalContext);
  const { setShowProfile, currentProfile } = modalContext;
  const { firstName, lastName, email, picture } = currentProfile;
  const { showClose, opened } = props;
  return (
    <Modal showClose={showClose} opened={opened} setModal={setShowProfile}>
      <div className="ShowProfile">
        <div className="ShowProfile-photo">
          <UserImage src={picture} alt={`${firstName} ${lastName}`} size="l" showStatus={false} status="online" />
        </div>

        <div className="ShowProfile-personal-info">
          <div className="ShowProfile-about-content">
            <div className="ShowProfile-firstName">
              <p>First Name </p>
              <h4>{firstName}</h4>
            </div>
            <div className="ShowProfile-lastName">
              <p>Last Name</p>
              <h4>{lastName}</h4>
            </div>
            <div className="ShowProfile-email">
              <p>Email Address</p>
              <h4>{email}</h4>
            </div>
            <div className="ShowProfile-friends">
              <p>Mutual Friends</p>
              <h4>0</h4>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ShowProfile;
