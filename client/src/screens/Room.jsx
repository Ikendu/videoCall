import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/SockectProvider";
import ReactPlayer from "react-player";
import peer from "../services/peer";

function Room() {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState(null);

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

  const handleIncommingCall = useCallback(({ from, offer }) => {
    console.log("incomming call ", from, offer);
  }, []);
//handling joining room and creating room
  useEffect(() => {
    socket.on("user:joined", handleUserJoinRoom);
    socket.on("incomming:call", handleIncommingCall);

    return () => {
      socket.off("user:joined", handleUserJoinRoom);
      socket.off("incomming:call", handleIncommingCall);
    };
  }, [socket, handleUserJoinRoom, handleIncommingCall]);

  return (
    <div>
      <h3>{remoteSocketId ? "Connected with a user" : "No one in the room"}</h3>
      <div>
        <h2>My Stream</h2>
        {remoteSocketId && <button onClick={handleUserCall}>Call</button>}
        {myStream && (
          <ReactPlayer
            url={myStream}
            playing
            muted
            width={"500"}
            height={"300"}
          />
        )}
      </div>
    </div>
  );
}
export default Room;
