let app = require('express')();

let http = require('http').Server(app);

let io = require('socket.io')(http);

app.get('/', (req, res) => {
   res.sendFile(__dirname + '/index.html')
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('a user disconnected');
    });

    socket.on('Created',(data)=>{
        socket.broadcast.emit('Created',(data))
    })

    socket.on('chat-message',(data)=>{
        console.log("chat mesg", data)
        socket.broadcast.emit('chat-message',(data))
    })
    socket.on('typing',(data)=>{
        socket.broadcast.emit('typing',(data))
    })
    socket.on('stopTyping',(data)=>{
        socket.broadcast.emit('stopTyping',(data))
    })
    socket.on('joined',(data)=>{
        socket.broadcast.emit('joined',(data))
    })
    socket.on('leaved',(data)=>{
        socket.broadcast.emit('leaved',(data))
    })
});


http.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});