import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/SockectProvider";
import ReactPlayer from "react-player";

function Room() {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState(null);

  const handleUserJoinRoom = useCallback(({ email, id }) => {
    console.log(`${email} joined the room`);
    setRemoteSocketId(id);
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoinRoom);

    return () => socket.off("user:joined", handleUserJoinRoom);
  }, [socket, handleUserJoinRoom]);

  const handleUserCall = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setMyStream(stream);
  }, []);

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
