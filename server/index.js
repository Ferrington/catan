const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: "http://localhost:5173" } });

const players = {};

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  const player = {
    id: socket.id,
    name: null,
    color: null,
  };

  players[socket.id] = player;

  io.emit("update player list", players);
  socket.emit("set player id", socket.id);

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("set player info", ({ name, color }) => {
    players[socket.id].name = name;
    players[socket.id].color = color;
    io.emit("update player list", players);
  });

  socket.on("disconnect", () => {
    io.emit("remove player", socket.id);

    delete players[player.id];
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
