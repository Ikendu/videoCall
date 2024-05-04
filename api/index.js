const { Server } = require("socket.io");

//creating the server connected
const io = new Server(8000, {
  cors: true,
});

const emailToSocketIdMap = new Map();
const socketIdToEmailMap = new Map();

//connsecting the frontend
io.on("connection", (socket) => {
  console.log("connected", socket.id);

  //accepting login connections
  socket.on("room:join", (data) => {
    const { email, room } = data;
    emailToSocketIdMap.set(email, socket.id);
    socketIdToEmailMap.set(socket.id, email);

    io.to(socket.id).emit("room:join", data);
  });
});
