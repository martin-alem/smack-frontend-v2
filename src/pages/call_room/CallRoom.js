import React from "react";
import "./CallRoom.css";
import { SocketContext } from "../../context/socketContext";
import { ModalContext } from "./../../context/modalContext";
import { UserContext } from "../../context/userContext";

function CallRoom(props) {
  const socketContext = React.useContext(SocketContext);
  const modalContext = React.useContext(ModalContext);
  const userContext = React.useContext(UserContext);
  const user = userContext.user;
  const { modalData, setModalData } = modalContext;
  const socket = socketContext.socket;
  const localVideo = React.useRef();
  const remoteVideo = React.useRef();
  const localStream = React.useRef();
  const peerConnection = React.useRef();
  const peer = modalData.callerId === user._id ? modalData.recipientId : modalData.callerId;
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

  const createPeerConnection = () => {
    const peerConnection = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.stunprotocol.org",
        },
        {
          urls: "turn:numb.viagenie.ca",
          credential: "muazkh",
          username: "webrtc@live.com",
        },
      ],
    });

    return peerConnection;
  };

  const endCall = () => {
    localStream.current.getTracks().forEach(track => {
      if (track.kind === "video" || track.kind === "audio") {
        track.stop();
      }
    });
    localStorage.removeItem("call_data");
    props.history.replace("/home");
  };

  const leaveCall = () => {
    const payload = {
      peerId: peer,
    };
    localStorage.removeItem("call_data");
    socket.emit("leave", payload);
  };

  const makeCall = async () => {
    peerConnection.current = createPeerConnection();
    localStream.current.getTracks().forEach(track => {
      peerConnection.current.addTrack(track, localStream.current);
    });
    const sdpOffer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(sdpOffer);
    const payload = {
      peerId: peer,
      sdp: sdpOffer,
    };
    socket.emit("sdp-offer", payload);
    socket.on("sdp-answer", async ({ sdp }) => {
      if (sdp) {
        try {
          await peerConnection.current.setRemoteDescription(new RTCSessionDescription(sdp));
        } catch (error) {
          console.error(error);
        }
      }
    });

    //Listen for local ICE candidate
    peerConnection.current.addEventListener("icecandidate", event => {
      if (event.candidate) {
        const payload = {
          peerId: peer,
          candidate: event.candidate,
        };
        socket.emit("ice-candidate", payload);
      }
    });
    //Connection state
    peerConnection.current.addEventListener("connectionstatechange", event => {
      if (event.currentTarget.iceConnectionState === "connected") {
        console.log("PEERS CONNECTED");
      }
    });

    peerConnection.current.addEventListener("track", event => {
      console.log("RECEIVING REMOTE STREAM");
      try {
        remoteVideo.current.srcObject = event.streams[0];
      } catch (error) {
        console.error(error);
      }
    });

    //Listen for remote ICE candidate
    socket.on("ice-candidate", async ({ candidate }) => {
      try {
        await peerConnection.current.addIceCandidate(candidate);
      } catch (error) {
        console.log(error);
      }
    });
  };

  const answerCall = () => {
    socket.on("sdp-offer", async data => {
      const { sdp } = data;
      if (sdp) {
        peerConnection.current = createPeerConnection();
        localStream.current.getTracks().forEach(track => {
          peerConnection.current.addTrack(track, localStream.current);
        });
        peerConnection.current.setRemoteDescription(new RTCSessionDescription(sdp));
        const sdpAnswer = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(sdpAnswer);
        const payload = {
          peerId: peer,
          sdp: sdpAnswer,
        };
        socket.emit("sdp-answer", payload);

        //Listen for connectivity information
        peerConnection.current.addEventListener("icecandidate", event => {
          if (event.candidate) {
            const payload = {
              peerId: peer,
              candidate: event.candidate,
            };
            socket.emit("ice-candidate", payload);
          }
        });

        //Connection state
        peerConnection.current.addEventListener("connectionstatechange", event => {
          if (event.currentTarget.iceConnectionState === "connected") {
            console.log("PEERS CONNECTED");
          }
        });

        peerConnection.current.addEventListener("track", event => {
          console.log("RECEIVING REMOTE STREAM");
          try {
            remoteVideo.current.srcObject = event.streams[0];
          } catch (error) {
            console.error(error);
          }
        });

        //Listen for remote ICE candidate
        socket.on("ice-candidate", async ({ candidate }) => {
          try {
            await peerConnection.current.addIceCandidate(candidate);
          } catch (error) {
            console.log(error);
          }
        });
      }
    });
  };

  React.useEffect(() => {
    const handleAsync = async () => {
      await openAndUseMediaDevices();

      socket.on("leave", () => {
        endCall();
      });

      socket.on("answer_call", data => {
        setModalData(data);
      });

      if (user._id === modalData.callerId) {
        answerCall();
      } else {
        makeCall();
      }
    };
    handleAsync();
    return () => {
      leaveCall();
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
