const app = require('express')();
const server = require('http').createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})
io.on('connection', (socket) => {
    socket.on("send",(data)=>{
        socket.broadcast.emit("recieve",data)
    })
})

server.listen(8000, () => {
    console.log('listening on *:8000');
});