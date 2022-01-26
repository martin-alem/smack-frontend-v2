import React from "react";
import "./CallRoom.css";
import { SocketContext } from "../../context/socketContext";

function CallRoom(props) {
  const socketContext = React.useContext(SocketContext);
  const socket = socketContext.socket;
  const localVideo = React.useRef();
  const remoteVideo = React.useRef();
  const localStream = React.useRef();
  const remoteStream = React.useRef();

  const openAndUseMediaDevices = async () => {
    try {
      const constraints = {
        video: true,
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      localVideo.current.volume = 0;
      localVideo.current.srcObject = stream;
      localStream.current = stream;
    } catch (error) {
      console.error(error);
    }
  };

  const endCall = () => {
    localStream.current.getTracks().forEach(track => {
      if (track.kind === "video" || track.kind === "audio") {
        track.stop();
      }
    });
    props.history.replace("/home");
  };

  React.useEffect(() => {
    socket.on("answer_call", data => {
      console.log("Start video call");
    });

    socket.on("reject_call", data => {
      props.history.replace("/home");
    });
  });

  React.useEffect(() => {
    const handleAsync = async () => {
      await openAndUseMediaDevices();
    };
    handleAsync();

    return () => {
      endCall();
    };
  }, []);
  return (
    <div className="CallRoom">
      <div className="CallRoom-call-area">
        <video id="localVideo" autoPlay ref={localVideo} muted></video>
        <video id="remoteVideo" autoPlay ref={remoteVideo}></video>
        <button onClick={endCall} type="button" className="CallRoom-end">
          <span className="material-icons-outlined">call_end</span>
        </button>
      </div>
    </div>
  );
}

export default CallRoom;
