var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080);

io.on('connection', function (socket) {

  socket.on('ready', async payload => {
    const { userId, room } = payload
    const users = io.of('/').in().adapter.rooms[room];

    // console.log('ready: %s, room: %s, users: %o', userId, room, users)

    io.to(room).emit('users', {
      initiator: socket.id,
      users,
    })
  });

    socket.on('join', function (data) {
        socket.join(data.roomId);

        // console.log('join', data.roomId, socket.id)
        
        socket.emit('init',{
          userId: socket.id
        });
    });

    socket.on('signal', payload => {
        io.to(payload.userId).emit('signal', {
          userId:socket.id,
          signal: payload.signal,
        })
      })
    socket.on('disconnect', () => {
        const roomId = Object.keys(socket.adapter.rooms)[0]
        if (socket.room){
            io.to(socket.room).emit('disconnected')
        }
        
    })
});
