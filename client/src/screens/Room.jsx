import { useEffect } from "react";
import { useSocket } from "../context/SocketProvider";

function Room() {
  const socket = useSocket();

  useEffect(() => {}, []);

  return <div>My Room</div>;
}
export default Room;
