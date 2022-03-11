const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const {Server, Socket} = require('socket.io');

app.use(cors());



const server = http.createServer(app);

const io = new Server(server, {

    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"],
    },
})

//CONNESSIONE SOCKET
io.on("connection", (socket) => {

    console.log(`User connected: ${socket.id}`);

    //ENTRA NELLA STANZA
    socket.on("join_room", (data) =>{
        socket.join(data);
        console.log(`User ${socket.id} joined room ${data}`);
    });



    //INVIA MESSAGGIO
    socket.on("send_message", (data) =>{

        socket.to(data.room).emit("receive_message", data);

    });


    //DISCONNETTI UTENTE
    socket.on("disconnect", ()=>{
        console.log("User Disconnected", socket.id);
    });

});



server.listen(3001, ()=>{

    console.log('Server running');
    
});