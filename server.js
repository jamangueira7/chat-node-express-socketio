const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'ChatCord Bot';

//Rodar quando os clientes conectarem
io.on('connection', socket => {
    //Bem vindo usuario atual
    socket.emit('message', formatMessage(botName, 'Bem vindo ao ChatCord!'));

    //rodar quando os usuarios conectarem
    socket.broadcast.emit('message', formatMessage(botName,'Um usuario entrou no chat.'));

    //rodar quando um client desconectar
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(botName,'Um usuario saiu do chat!'));
    });

    //Escutar chatMessage
    socket.on('chatMessage', (msg) => {
        io.emit('message', formatMessage('USER', msg));
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
