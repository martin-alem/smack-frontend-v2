import React from "react";
import "./ShowProfile.css";
import Modal from "../modal/Modal";
import Accordion from "./../../components/accordion/Accordion";
import UserImage from "../../components/user_image/UserImage";
import image from "./../../images/user.jpg";

function ShowProfile(props) {
  const { showClose, opened } = props;
  return (
    <Modal showClose={showClose} opened={opened}>
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
      </div>
    </Modal>
  );
}

export default ShowProfile;
