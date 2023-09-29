// Node Server 
const io = require('socket.io')(8000,{
    cors: {
      origin: 'http://127.0.0.1:5500', // Allow requests from this origin
      methods: ['GET', 'POST'], // You can customize the allowed HTTP methods
    },
  });

const users = {};

io.on('connection', socket=>{
    socket.on('new-user-joined', name=>{
        // console.log("new-user-joined", name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message=>{
        socket.broadcast.emit('receive', {message: message,  name : users[socket.id]});
    });

    socket.on('disconnect', message =>{
      socket.broadcast.emit('left', users[socket.id])
      delete users[socket.id];
    })
    // disconnect is an inbuilt event that is fired when user gets diconnected from the socket server.
})
