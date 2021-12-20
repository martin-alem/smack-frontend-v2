import React from "react";
import "./ShowProfile.css";
import { ModalContext } from "./../../context/modalContext";
import Modal from "../modal/Modal";
import UserImage from "../../components/user_image/UserImage";
import image from "./../../images/user.jpg";
import Button from "./../../components/button/Button";

function ShowProfile(props) {
  const modalContext = React.useContext(ModalContext);
  const { setShowProfile } = modalContext;
  const { showClose, opened, isFriend } = props;
  return (
    <Modal showClose={showClose} opened={opened} setModal={setShowProfile}>
      <div className="ShowProfile">
        <div className="ShowProfile-photo">
          <UserImage
            src={image}
            alt="Martin Alemajoh"
            size="l"
            showStatus={false}
            status="online"
          />
        </div>

        <div className="ShowProfile-personal-info">
          <div className="ShowProfile-about-content">
            <div className="ShowProfile-firstName">
              <p>First Name </p>
              <h4>Martin</h4>
            </div>
            <div className="ShowProfile-lastName">
              <p>Last Name</p>
              <h4>Alemajoh</h4>
            </div>
            <div className="ShowProfile-email">
              <p>Email Address</p>
              <h4>alemajohmartin@gmail.com</h4>
            </div>
            <div className="ShowProfile-friends">
              <p>Mutual Friends</p>
              <h4>365</h4>
            </div>
          </div>
        </div>
        <div className="ShowProfile-send-request">
          {isFriend ? null : (
            <Button variant="primary" size="small" text="Send Request" icon="person_add" />
          )}
        </div>
      </div>
    </Modal>
  );
}

export default ShowProfile;
