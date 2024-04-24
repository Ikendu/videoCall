import { useCallback, useState } from "react";

function LifeScreen() {
  const [email, setEmail] = useState("");
  const [roomID, setRoomID] = useState("");

  const submitForm = useCallback(
    (e) => {
      e.preventDefault();
      console.log({ email, roomID });
    },
    [email, roomID]
  );

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
        <button>Join</button>
      </form>
    </div>
  );
}
export default LifeScreen;
