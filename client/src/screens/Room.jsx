import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";

function Room() {
  const socket = useSocket();
  const [remoteUserId, setRemoteUserId] = useState(null);

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`${email} joined the room`);
    setRemoteUserId(id);
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    return () => {
      socket.off("user:joined", handleUserJoined);
    };
  }, [handleUserJoined, socket]);

  return (
    <div>
      <h1>Chat Room</h1>
      <h3>{remoteUserId ? "Connected" : "No one in the room"}</h3>
    </div>
  );
}
export default Room;
