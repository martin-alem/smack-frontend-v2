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

  const handleIceCandidateEvent = event => {
    if (event.candidate) {
      const peer = modalData.callerId === user._id ? modalData.recipientId : modalData.callerId;
      const payload = {
        peerId: peer,
        candidate: event.candidate,
      };
      socket.emit("ice-candidate", payload);
    }
  };

  const handleTrackEvent = event => {
    try {
      remoteVideo.current.srcObject = event.streams[0];
    } catch (error) {
      console.error(error);
    }
  };

  const handleNegotiationNeededEvent = async () => {
    try {
      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);
      const peer = modalData.callerId === user._id ? modalData.recipientId : modalData.callerId;
      const payload = {
        peerId: peer,
        sdp: peerConnection.current.localDescription,
      };
      socket.emit("sdp-offer", payload);
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

    peerConnection.onicecandidate = handleIceCandidateEvent;
    peerConnection.ontrack = handleTrackEvent;
    peerConnection.onnegotiationneeded = handleNegotiationNeededEvent;

    return peerConnection;
  };

  const initializeCall = () => {
    try {
      peerConnection.current = createPeerConnection();
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
    console.log(modalData);
    const peer = modalData.callerId === user._id ? modalData.recipientId : modalData.callerId;
    const payload = {
      peerId: peer,
    };
    socket.emit("leave", payload);
    props.history.replace("/home");
  };

  const handleOffer = async offer => {
    try {
      peerConnection.current = createPeerConnection();
      const desc = new RTCSessionDescription(offer.sdp);
      await peerConnection.current.setRemoteDescription(desc);
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);
      const peer = modalData.callerId === user._id ? modalData.recipientId : modalData.callerId;
      const payload = {
        peerId: peer,
        sdp: peerConnection.current.localDescription,
      };
      socket.emit("sdp-answer", payload);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAnswer = async answer => {
    try {
      const desc = new RTCSessionDescription(answer.sdp);
      await peerConnection.current.setRemoteDescription(desc);
    } catch (error) {
      console.error(error);
    }
  };

  const handleIceCandidate = async candidate => {
    try {
      const iceCandidate = new RTCIceCandidate(candidate.candidate);
      peerConnection.current.addIceCandidate(iceCandidate);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    const handleAsync = async () => {
      await openAndUseMediaDevices();

      socket.on("answer_call", data => {
        setModalData(data);
        initializeCall();
      });

      socket.on("reject_call", data => {
        props.history.replace("/home");
      });

      //listen for offers
      socket.on("sdp-offer", handleOffer);

      //listen for answers
      socket.on("sdp-answer", handleAnswer);

      //listen for ice-candidates
      socket.on("ice-candidate", handleIceCandidate);

      //listen for when other peer leaves
      socket.on("leave", endCall);
    };
    handleAsync();
    initializeCall(); // if the user is answering a call
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
