import { useCallback, useState } from "react";
import { useSocket } from "../context/SocketProvider";

function LifeChat() {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email"> Email:</label>
        <input
          type="email"
          id="email"
          placeholder="exampl@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="id">Room ID:</label>
        <input
          type="text"
          id="id"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <br />
        <button>Join</button>
      </form>
    </div>
  );
}
export default LifeChat;
