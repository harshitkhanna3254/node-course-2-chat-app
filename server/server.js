const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
var app = express();
var server = http.createServer(app);
const {generateMessage} = require('./utils/message');
const {generateLocationMessage} = require('./utils/message');

//here we are configuring the server to also include socketIO. This is the reason we changed from express server to http server.
var io = socketIO(server); //  


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));


io.on('connection', (socket) => {
  console.log("New User Connected");

    socket.emit('newMessage', generateMessage('Admin','Welcome to the Chat App!'));
    socket.broadcast.emit('newMessage', generateMessage('Admin','New User has just joined.'))

    socket.on('createMessage', (message,callback) => {
        console.log("New message received from client to server. The details are : ", message);

         io.emit('newMessage',generateMessage(message.from,message.text)) // socket.emit() is for a single socket. io.emit() isfor every socket/window/user.
         callback();
    });

    socket.on('createLocationMessage', (coords) => {
            io.emit('newLocationMessage',generateLocationMessage('Admin', coords.latitude, coords.longitude))
    })

  socket.on('disconnect', () => {
  console.log("User was disconnected")
 })
});

server.listen(port , () => {
    console.log(`App started on port ${port}`);
})

