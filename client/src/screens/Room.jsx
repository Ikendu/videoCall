import { useCallback, useEffect } from "react";
import { useSocket } from "../context/SockectProvider";

function Room() {
  const socket = useSocket;

  const handleUserJoinRoom = useCallback(({ email, id }) => {
    console.log(`${email} joined the room`);
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoinRoom);
    return () => socket.off("user:joined", handleUserJoinRoom);
  }, [socket, handleUserJoinRoom]);

  return <div>My Room</div>;
}
export default Room;
