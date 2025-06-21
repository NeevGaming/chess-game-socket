const { Server } = require("socket.io");

const io = new Server({
  cors: {
    origin: "https://chess-game-next-ashen.vercel.app",
    methods: ["GET", "POST"]
  }
});

let dict = {};

io.on("connection", (socket) => {
  // console.log(`Connected to ${socket.id}`);

  socket.on("code", (code) => {
    if (!dict[code.toString()]) dict[code.toString()] = [socket];
    else dict[code.toString()].push(socket);
  });

  socket.on("update", (data) => {
    const code = data.code;
    console.log(dict[code.toString()])
    if (dict[code.toString()]) {
      dict[code.toString()].forEach(element => {
        element.emit('update', data.fen);
      });
    }
  });
});


io.listen(5000);
