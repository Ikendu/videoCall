import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/SockectProvider";
import { useNavigate } from "react-router-dom";

function LifeScreen() {
  const [email, setEmail] = useState("");
  const [roomID, setRoomID] = useState("");
  const navigate = useNavigate();

  const socket = useSocket();

  // console.log("SOCKET", socket);

  const submitForm = useCallback(
    (e) => {
      e.preventDefault();
      // console.log({ email, roomID });
      socket.emit("room:join", { email, roomID });
    },
    [email, roomID, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, roomID } = data;
      navigate(`/room/${roomID}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket]);

  return (
    <div>
      <h1>LifeScreen</h1>
      <form onSubmit={submitForm}>
        <label htmlFor="email">Email ID</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="room">room ID</label>
        <input
          id="room"
          type="text"
          value={roomID}
          onChange={(e) => setRoomID(e.target.value)}
        />
        <br />
        <button style={{ marginTop: 20 }}>Join</button>
      </form>
    </div>
  );
}
export default LifeScreen;
