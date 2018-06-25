const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
var app = express();
var server = http.createServer(app);
const {generateMessage} = require('./utils/message');
//here we are configuring the server to also include socketIO. This is the reason we changed from express server to http server.
var io = socketIO(server); //  


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));


io.on('connection', (socket) => {
  console.log("New User Connected");
    // socket.emit('newMessage', {
    //     from: 'Sugandh Goyal',
    //     text:'Yo Nigger!',
    //     createdAt: 911
    // }); //Emitting a new event. Listened by client. Not a listener so not providing a callback like in client side
    //     //Also, we can trigget this event without sending any data. To send data, we  just add another arguement which wil be an object


    socket.emit('newMessage', generateMessage('Admin','Welcome to the Chat App!'));
    socket.broadcast.emit('newMessage', generateMessage('Admin','New User has just joined.'))

    socket.on('createMessage', (message) => {
        console.log("New message received from client to server. The details are : ", message);

        // io.emit('newMessage',generateMessage(message.from,message.text)) // socket.emit() is for a single socket. io.emit() isfor every socket/window/user.

        socket.broadcast.emit('newMessage', generateMessage(message.from,message.text))

        //broadcast is an object. It has it's own emit() function. It wil emit the event to everyone but that socket.
        // socket.broadcast.emit('newMessage',{
        //      from: message.from,
        //      text: message.text,
        //      createdAt: new Date().getTime()  // for getting the time stamp
        // })


    });

  socket.on('disconnect', () => {
  console.log("User was disconnected")
 })
});

server.listen(port , () => {
    console.log(`App started on port ${port}`);
})

