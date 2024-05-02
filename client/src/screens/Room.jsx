import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/SockectProvider";
import ReactPlayer from "react-player";
import peer from "../services/peer";

function Room() {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  const handleUserJoinRoom = useCallback(({ email, id }) => {
    console.log(`${email} joined the room`);
    setRemoteSocketId(id);
  }, []);

  const handleUserCall = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log("incomming call ", from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call accepted");
      for (const track of myStream.getTracks()) {
        peer.peer.addTrack(track, myStream);
      }
    },
    [myStream]
  );

  const handelNegotiationNeed = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  const handleNegotiationIncoming = useCallback(
    ({ from, offer }) => {
      const ans = peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  useEffect(() => {
    peer.peer.addEventListener("track", async (e) => {
      const remoteStream = e.streams;
      setRemoteStream(remoteStream);
    });
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handelNegotiationNeed);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handelNegotiationNeed);
    };
  }, [handelNegotiationNeed]);

  useEffect(() => {
    socket.on("user:joined", handleUserJoinRoom);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegotiationIncoming);

    return () => {
      socket.off("user:joined", handleUserJoinRoom);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
    };
  }, [socket, handleUserJoinRoom, handleIncommingCall, handleCallAccepted]);

  return (
    <div>
      <h3>{remoteSocketId ? "Connected with a user" : "No one in the room"}</h3>
      <div>
        {remoteSocketId && <button onClick={handleUserCall}>Call</button>}
        {myStream && (
          <>
            <h2>My Stream</h2>
            <ReactPlayer
              url={myStream}
              playing
              muted
              width={"500"}
              height={"300"}
            />
          </>
        )}
        {remoteStream && (
          <>
            <h2>Remote Stream</h2>
            <ReactPlayer
              url={myStream}
              playing
              muted
              width={"500"}
              height={"300"}
            />
          </>
        )}
      </div>
    </div>
  );
}
export default Room;
