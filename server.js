const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Rodar quando os clientes conectarem
io.on('connection', socket => {
    //Bem vindo usuario atual
    socket.emit('message', 'Bem vindo ao ChatCord!');

    //rodar quando os usuarios conectarem
    socket.broadcast.emit('message', 'Um usuario entrou no chat.');

    //rodar quando um client desconectar
    socket.on('disconnect', () => {
        io.emit('message', 'Bem vindo ao Chat!');
    });

    //Escutar chatMessage
    socket.on('chatMessage', (msg) => {
        io.emit('message', msg);
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
