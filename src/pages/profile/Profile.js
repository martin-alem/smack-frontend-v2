import React from "react";
import "./Profile.css";
import { UserContext } from "../../context/userContext";
import UserImage from "../../components/user_image/UserImage";
import Accordion from "./../../components/accordion/Accordion";
import Media from "./../../components/media/Media";
import More from "../../components/more/More";
import httpAgent from "./../../utils/httpAgent";

function Profile() {
  const userContext = React.useContext(UserContext);
  const user = userContext.user;
  const { _id, firstName, lastName, email, phoneNumber, picture, story } = user;
  const logout = async () => {
    try {
      const option = {
        headers: { Accept: "application/json" },
        body: null,
      };
      const serverResponse = await httpAgent("GET", `${process.env.REACT_APP_API}/api/v1/logout`, option);
      if (serverResponse.ok) {
        localStorage.clear();
        window.location.replace("/");
      } else {
        console.log(serverResponse);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="Profile">
      <div className="Profile-heading">
        <h4>Profile</h4>
        <More
          contents={[
            { text: "Logout", icon: "logout", action: logout },
            { text: "Delete Account", icon: "remove_circle_outline", action: () => console.log("Delete account") },
          ]}
        />
      </div>
      <div className="Profile-photo">
        <UserImage src={picture} alt="Martin Alemajoh" size="l" showStatus={false} status="online" />
        <div className="Profile-info">
          <h3>{`${firstName} ${lastName}`}</h3>
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
              <h4>{`${firstName}`}</h4>
            </div>
            <div className="Profile-lastName">
              <p>Last Name</p>
              <h4>{`${lastName}`}</h4>
            </div>
            <div className="Profile-email">
              <p>Email Address</p>
              <h4>{`${email}`}</h4>
            </div>
            <div className="Profile-phone">
              <p>Phone Number</p>
              <h4>{`${phoneNumber}`}</h4>
            </div>
            <div className="Profile-friends">
              <p>Mutual Friends</p>
              <h4>365</h4>
            </div>
          </div>
        </Accordion>

        <Accordion name="personal-info" title="story" icon="auto_stories" type="story">
          <div className="Profile-story-content">
            <p>{`${story}`}</p>
          </div>
        </Accordion>

        <Accordion name="personal-info" title="Attached Files" icon="attachment" type="attachment">
          <div className="Profile-media-content">
            <Media name="Image1.jpg Image1.jpg Image1.jpg Image1.jpg Image1.jpg" icon="image" size="34" />
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
