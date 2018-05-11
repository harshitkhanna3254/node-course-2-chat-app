const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
var app = express();
var server = http.createServer(app);

//here we are configuring the server to also include socketIO. This is the reason we changed from express server to http server.
var io = socketIO(server); //  


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));


io.on('connection', (socket) => {
console.log("New User Connected");


socket.on('disconnect', () => {
console.log("User was disconnected")
})
});

server.listen(port , () => {
    console.log(`App started on port ${port}`);
})

