const chatForm = document.getElementById('chat-form');
const socket = io();
const chatMessages = document.querySelector('.chat-messages')
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

//Pegar username e sala da URL
const { username, room } = Qs.parse(location.search, {
   ignoreQueryPrefix: true
});

//Enviar usuario e sala
socket.emit('joinRoom', { username, room });

//Pegar usuarios de uma sala
socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room);
    outputUsers(users);
});

//Mensagens do servidor
socket.on('message', (message) => {
    console.log(message);
    outputMessage(message);

    //Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

//mandando mensagem
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const msg = e.target.elements.msg.value;

    //Mandando mensagem ao servidor
    socket.emit('chatMessage', msg);

    //limpar input
    e.target.elements.msg.value = "";
    e.target.elements.msg.focus();
});

//Mandando msg para o DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `
        <p class="meta">${message.username} <span>${message.time}</span></p>
        <p class="text">${message.text}</p>
    `;

    document.querySelector('.chat-messages').appendChild(div);
}

//Add nome da sala ao DOM
function outputRoomName(room) {
    roomName.innerHTML = room;
}

function outputUsers(users) {
    userList.innerHTML = `
        ${users.map((user) => `<li>${user.username}</li>`).join('')}
    `;
}
