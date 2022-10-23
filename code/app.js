const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const uiServer = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const uiIo = new Server(uiServer);
const port = process.env.PORT || 8080;
const uiport = process.env.UI_PORT || 8081;
var uisocket = "";
var connsocket = "";
io.on('connection', (socket) => {
    connsocket = socket;
    console.log('IO: a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.on('video', (data) => {
      if (front != "") {
        front.emit("video", data);
      }
    });
  });
server.listen(port, () => {
  console.log('Server listening on *:' + port);
});

uiIo.on('connection', (socket) => {
    front = socket;
    console.log('uiIO: a user connected');
    socket.on("control", (control) => {
      connsocket.emit("control", control);
    });
    socket.on("user_on", (status) => {
      connsocket.emit("user_on", status);
    });
    socket.on('disconnect', () => {
      front = "";
      console.log('user disconnected');
    });
  });
uiServer.listen(uiport, () => {
  console.log('UIServer listening on *:' + uiport);
});