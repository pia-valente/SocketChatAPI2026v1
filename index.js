const express = require("express");
const app = express();

const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server); //socket.io instance

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  io.emit("connection", "a user connected");
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", msg);
    socket.on("typing", (name) => {
      socket.broadcast.emit("new user", name + "Has joined the chat");
    });
  });
});
server.listen(3000, () => {
  console.log("listening on *:3000");
});
