const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("views"));

let users = {};

io.on("connection", (socket) => {
    socket.on("join", (username) => {
        users[socket.id] = username;
        io.emit("online", Object.keys(users).length);
        io.emit("system", username + " joined");
    });

    socket.on("message", (msg) => {
        io.emit("message", {
            user: users[socket.id],
            text: msg,
            id: socket.id,
        });
    });

    socket.on("typing", (status) => {
        socket.broadcast.emit("typing", {
            user: users[socket.id],
            status,
        });
    });

    socket.on("disconnect", () => {
        if (users[socket.id]) {
            io.emit("system", users[socket.id] + " left");
            delete users[socket.id];
            io.emit("online", Object.keys(users).length);
        }
    });
});

server.listen(3000, () => {
    console.log("Server started at http://localhost:3000/");
});
