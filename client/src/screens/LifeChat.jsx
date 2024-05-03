import { useCallback, useState } from "react";

function LifeChat() {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    console.log({ email, room });
  }, []);

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
