const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'ChatCord Bot';

//Rodar quando os clientes conectarem
io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room }) => {

        const user = userJoin(socket.id, username, room);

        socket.join(user.room);

        //Bem vindo usuario atual
        socket.emit('message', formatMessage(botName, 'Bem vindo ao ChatCord!'));

        //rodar quando os usuarios conectarem
        socket.broadcast.to(user.room).emit(
            'message',
            formatMessage(botName,`O usuario ${user.username} entrou no chat.`)
        );
    });

    //Escutar chatMessage
    socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.id);

        io.to(user.room).emit('message', formatMessage(user.username, msg));
    });

    //rodar quando um client desconectar
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if(user) {
            io.to(user.room).emit(
                'message',
                formatMessage(botName,`O usuario ${user.username} saiu do chat!`)
            );
        }
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
