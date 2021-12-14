import React from "react";
import "./Profile.css";
import Image from "./../../images/user.jpg";
import Accordion from "./../../components/accordion/Accordion";
import Media from "./../../components/media/Media";
import More from "../../components/more/More";

function Profile() {
  return (
    <div className="Profile">
      <div className="Profile-heading">
        <h4>Profile</h4>
        <More
          contents={[
            { text: "Logout", icon: "logout" },
            { text: "Delete Account", icon: "remove_circle_outline" },
          ]}
        />
      </div>
      <div className="Profile-photo">
        <img className="Profile-image" src={Image} alt="user profile" />
        <div className="Profile-info">
          <h3>Martin Alemajoh</h3>
          <div className="Profile-status">
            <div className="Profile-online"></div>
            <div className="Profile-online-text">Online</div>
          </div>
        </div>
      </div>

      <div className="Profile-personal-info">
        <Accordion name="personal-info" title="Personal Info" icon="person" type="personal-info">
          <div className="Profile-about-content">
            <div className="Profile-firstName">
              <p>First Name </p>
              <h4>Martin</h4>
            </div>
            <div className="Profile-lastName">
              <p>Last Name</p>
              <h4>Alemajoh</h4>
            </div>
            <div className="Profile-email">
              <p>Email Address</p>
              <h4>alemajohmartin@gmail.com</h4>
            </div>
            <div className="Profile-phone">
              <p>Phone Number</p>
              <h4>+1(614)-284-5041</h4>
            </div>
            <div className="Profile-friends">
              <p>Mutual Friends</p>
              <h4>365</h4>
            </div>
          </div>
        </Accordion>

        <Accordion name="personal-info" title="story" icon="auto_stories" type="story">
          <div className="Profile-story-content">
            <p>
              If several languages coalesce, the grammar of the resulting language is more simple
              and regular than that of the individual.
            </p>
          </div>
        </Accordion>

        <Accordion name="personal-info" title="Attached Files" icon="attachment" type="attachment">
          <div className="Profile-content">
            <Media name="Image1.jpg" icon="image" size="34" />
            <Media name="Image1.jpg" icon="image" size="34" />
            <Media name="Image1.jpg" icon="image" size="34" />
            <Media name="Image1.jpg" icon="image" size="34" />
            <Media name="Image1.jpg" icon="image" size="34" />
            <Media name="Image1.jpg" icon="image" size="34" />
            <Media name="Image1.jpg" icon="image" size="34" />
          </div>
        </Accordion>
      </div>
    </div>
  );
}

export default Profile;
