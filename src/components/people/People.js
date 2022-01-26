import React from "react";
import "./People.css";
import { ModalContext } from "./../../context/modalContext";
import { UserContext } from "../../context/userContext";
import { SocketContext } from "../../context/socketContext";
import UserImage from "./../../components/user_image/UserImage";
import Button from "./../../components/button/Button";
import httpAgent from "./../../utils/httpAgent";

function People(props) {
  const { person } = props;
  const modalContext = React.useContext(ModalContext);
  const userContext = React.useContext(UserContext);
  const socketContext = React.useContext(SocketContext);
  const socket = socketContext.socket;
  const user = userContext.user;
  const { showProfile, setShowProfile, setCurrentProfile } = modalContext;
  const [status, setStatus] = React.useState("inactive");
  const [checkingStatus, setCheckingStatus] = React.useState(true);

  const sendFriendRequest = async () => {
    try {
      setCheckingStatus(true);
      const notificationMessage = `${user.firstName} ${user.lastName} sent you a friend request`;
      const option = {
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          friendId: person._id,
          userInfo: {
            friendId: user._id,
            status: "pending",
            date: new Date(),
          },
          friendInfo: {
            friendId: person._id,
            status: "sent",
            date: new Date(),
          },
          notification: {
            senderId: user._id,
            recipientId: person._id,
            read: false,
            body: notificationMessage,
            notificationType: "friend_request",
            date: new Date(),
          },
        }),
      };

      const serverResponse = await httpAgent("POST", `${process.env.REACT_APP_API}/api/v1/friend_request/send`, option);
      const jsonResponse = await serverResponse.json();
      if (serverResponse.ok) {
        setStatus("sent");
        const payload = {
          recipient: {
            userId: person._id,
          },
          message: jsonResponse,
        };
        socket.emit("notification", payload);
      } else {
        console.log(jsonResponse);
        setStatus("inactive");
      }
    } catch (error) {
      console.log(error);
    }
    setCheckingStatus(false);
  };

  const getFriendStatus = async () => {
    try {
      const option = {
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: null,
      };
      const serverResponse = await httpAgent("GET", `${process.env.REACT_APP_API}/api/v1/friends/${user._id}/${person._id}`, option);
      const jsonResponse = await serverResponse.json();
      if (serverResponse.ok) {
        const status = jsonResponse.payload;
        setStatus(status);
      } else {
        setStatus("inactive");
      }
      setCheckingStatus(false);
    } catch (error) {
      console.log(error);
    }
  };

  const showUserProfile = () => {
    setCurrentProfile({
      firstName: person.firstName,
      lastName: person.lastName,
      picture: person.picture,
      email: person.email,
    });
    setShowProfile(!showProfile);
  };

  React.useEffect(() => {
    const fetchAsync = async () => {
      await getFriendStatus();
    };
    fetchAsync();
  }, []);
  return (
    <div className="People">
      <div onClick={() => showUserProfile()} className="People-info">
        <UserImage size="s" alt={person.lastName} src={person.picture} showStatus={false} />
        <div className="People-details">
          <h4>
            {person.firstName} {person.lastName}
          </h4>
          <p>{0} mutual friends</p>
        </div>
      </div>
      <div className="People-add">
        {status === "pending" ? (
          <Button variant="tertiary" size="small" text="Pending" icon="pending" />
        ) : status === "active" ? (
          <Button variant="secondary" size="small" text="Friends" icon="people" />
        ) : status === "sent" ? (
          <Button variant="tertiary" size="small" text="Sent" icon="done" />
        ) : (
          <Button variant="primary" size="small" text="Request" icon="person_add" action={sendFriendRequest} loading={checkingStatus} />
        )}
      </div>
    </div>
  );
}

export default People;
