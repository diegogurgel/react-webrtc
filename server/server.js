var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080);

io.on('connection', function (socket) {
    socket.on('join', function (data) {
        socket.join(data.roomId);
        const sockets = io.of('/').in().adapter.rooms[data.roomId];
        if(sockets.length===1){
            socket.emit('init')
        }else{
            if (sockets.length===2){
                io.to(data.roomId).emit('ready')
            }else{
                socket.emit('full')
            }
            
        }
    });
    socket.on('signal', description => {
        io.to('a3b43').emit('desc', description)        
    })
    socket.on('disconnect', () => {
        const roomId = Object.keys(socket.adapter.rooms)[0]
        io.to(roomId).emit('disconnected')
    })
});
