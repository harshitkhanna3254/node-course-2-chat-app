const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
var app = express();
var server = http.createServer(app);

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));




server.listen(port , () => {
    console.log(`App started on port ${port}`);
})

