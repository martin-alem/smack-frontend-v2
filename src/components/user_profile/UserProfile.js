import React from "react";
import "./UserProfile.css";
import { UserContext } from "../../context/userContext";
import httpAgent from "./../../utils/httpAgent";

function UserProfile(props) {
  const contextMenu = React.useRef();
  const userContext = React.useContext(UserContext);
  const user = userContext.user;
  const { picture: Profile } = user;
  const toggleContextMenu = () => {
    contextMenu.current.classList.toggle("hide");
  };
  const handleItemClick = (arg, callback) => {
    callback(arg);
    toggleContextMenu();
  };

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
  const { setPage } = props;
  return (
    <div className="UserProfile">
      <div ref={contextMenu} className="UserProfile-context-menu hide">
        <div onClick={() => handleItemClick("settings", setPage)} className="UserProfile-context">
          <span className="profile-text">Settings</span>
          <span className="material-icons-outlined">settings</span>
        </div>
        <div onClick={() => handleItemClick("home", logout)} className="UserProfile-context">
          <span className="profile-text">Logout</span>
          <span className="material-icons-outlined">logout</span>
        </div>
      </div>
      <img onClick={toggleContextMenu} className="profile" src={Profile} alt="User profile" width="50px" height="50px" />
    </div>
  );
}

export default UserProfile;
