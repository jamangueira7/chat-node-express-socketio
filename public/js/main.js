const chatForm = document.getElementById('chat-form');
const socket = io();

socket.on('message', (message) => {
    console.log(message);
});

//mandando mensagem
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const msg = e.target.elements.msg.value;

    //Mandando mensagem ao servidor
    socket.emit('chatMessage', msg);
})
