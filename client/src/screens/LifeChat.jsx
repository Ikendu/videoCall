function LifeChat() {
  return (
    <div>
      <form>
        <label htmlFor="email"> Email:</label>{" "}
        <input type="email" id="email" placeholder="exampl@email.com" />
        <br />
        <label htmlFor="id">Room ID:</label>
        <input type="text" id="id" />
        <br />
        <button>Join</button>
      </form>
    </div>
  );
}
export default LifeChat;
