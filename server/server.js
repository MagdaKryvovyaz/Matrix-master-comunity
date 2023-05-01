require("dotenv").config();
require("./config/mongoose");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    // origin: 'http://localhost:3000',
    // origin: "https://matrix-master-commutity.onrender.com/",
    origin: ["http://localhost:3000", 'https://matrix-master-commutity.onrender.com'],
    methods: ["GET", "HEAD", "PUT", "POST", "DELETE"],
    preflightContinue: false,
    optionsSursccessStatus: 204,
    credentials: true,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Origin",
    ],
  })
);

// Socket.io
//socket connection setting
const http = require("http");
const socketio = require("socket.io");
const httpServer = http.createServer(app);
const io = socketio(httpServer, {
  cors: {
    // origin: "http://localhost:3000",
    // origin: "https://matrix-master-commutity.onrender.com/",
    origin: '*',
    methods: ["GET", "POST"],
    // allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Origin"],
    // credentials: true
  },
});
// Dictionary to store user sockets
const userSockets = {};

io.on("connection", (socket) => {
  console.log("A new user connected", socket.id);
  socket.on("setup", (userData) => {
    if (userData && userData.id) {
      // Store the user's socket in the dictionary
      userSockets[userData.id] = socket;
      console.log(`User ${userData.id} connected`);
      socket.join("onlineUsers");
      io.to("onlineUsers").emit("onlineUsers", Object.keys(userSockets));
      socket.userId = userData.id;
    }
    socket.emit("connected");
  });

  socket.on("user-disconnect", () => {
    delete userSockets[socket.userId];
    console.log(`User ${socket.userId} disconnected`);
    socket.leave("onlineUsers");
    // Remove the user's socket from the dictionary when they disconnect
    console.log(`User disconnected`);

    // Leave the onlineUsers room

    io.to("onlineUsers").emit("onlineUsers", Object.keys(userSockets));
  });

  // Listen for new comment events
  // Listen for new comment events
  socket.on("newComment", (data) => {
    const userId = data.userId;
    // Look up the user's socket in the dictionary and emit the event to that socket
    const userSocket = userSockets[userId];
    if (userSocket) {
      console.log("send notification about comment to owner of Question");
      io.to("onlineUsers").emit("notification", {
        type: "comment",
        commentId: data.commentId,
        userId: data.userId,
      });
    } else {
      console.log(`No socket found for user ${userId}`);
    }
  });

  socket.on("newLike", (data) => {
    const userId = data.userId;
    // Look up the user's socket in the dictionary and emit the event to that socket
    const userSocket = userSockets[userId];
    if (userSocket) {
      console.log("send notification about like to owner of Question");
      io.to("onlineUsers").emit("notification", {
        type: "like",
        questionID: data.questionId,
        userId: data.userId,
      });
    } else {
      console.log(`No socket found for user ${userId}`);
    }
  });
});

httpServer.listen(8000, () => {
  console.log("Socket.io listening on port 8000");
});
//end of socket connection settings
const router = require("./config/router");
const { log } = require("console");

app.use("/public", express.static("public"));

app.set("view engine", "ejs");
app.set("socketio", io);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/routes", router);
app.use(router);
app.listen(5000, () => {
  console.log("app is listening");
});
