var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080);

io.on('connection', function (socket) {
    socket.on('join', function (data) {
        socket.join(data.roomId);
        const sockets = io.of('/').in().adapter.rooms[data.roomId];
        if(sockets.length===1){
            socket.emit('initiator')
        }
    });
});
