import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/SockectProvider";

function Room() {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);

  const handleUserJoinRoom = useCallback(({ email, id }) => {
      console.log(`${email} joined the room`);
      setRemoteSocketId(id)
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoinRoom);

    return () => socket.off("user:joined", handleUserJoinRoom);
  }, [socket, handleUserJoinRoom]);

    return <div>{ remoteSocketId? 'Connected with a user' : 'No one in the room'}</div>;
}
export default Room;
