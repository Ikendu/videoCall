import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";
import ReactPlayer from "react-player";
import peer from "../service/peer";

function Room() {
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState(null);
  const socket = useSocket();

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`${email} joined the room`);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });

    setMyStream(stream);
  }, [remoteSocketId, socket]);

    const handleIncomingCall = useCallback(({ from, offer }) => {
      
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incoming:call", handleIncomingCall);
    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incoming:call", handleIncomingCall);
    };
  }, [handleIncomingCall, handleUserJoined, socket]);

  return (
    <div>
      <h1>Chat Room</h1>
      <h3>{remoteSocketId ? "Connected" : "No one in the room"}</h3>
      {remoteSocketId && <button onClick={handleCallUser}>Call</button>}
      {myStream && (
        <div>
          <h2>My Stream</h2>
          <ReactPlayer url={myStream} width={500} height={350} playing muted />
        </div>
      )}
    </div>
  );
}
export default Room;
