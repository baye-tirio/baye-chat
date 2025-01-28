import { Server } from "socket.io";
import http from "http";
import express from "express";
//normal express server
const app = express();
//normal http server aided by express
const server = http.createServer(app);
// socket.io server the one that's gon be emitting and listening to events
const io = new Server(server, {
  cors: {
    origin: ["https://baye-chat.onrender.com"],
  },
});
//This is basically used to store online users in userId:socketId format
const userSocketMap = {};
//a useful helper function for implementing real time messaging
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  console.log("A user connected id: ", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId !== "undefined") userSocketMap[userId] = socket.id;
  //emmits events to all connected socket clients
  io.emit("onlineUsers", Object.keys(userSocketMap));
  console.log("online users are: ");
  console.log(userSocketMap);
  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    console.log("A user disconnected id: ", socket.id);
    io.emit("onlineUsers", Object.keys(userSocketMap));
  });
});

export { io, server, app };
