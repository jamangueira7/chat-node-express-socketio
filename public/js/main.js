const chatForm = document.getElementById('chat-form');
const socket = io();
const chatMessages = document.querySelector('.chat-messages')
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

    //
});

//Mandando msg para o DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `
        <p class="meta">Brad <span>9:12pm</span></p>
        <p class="text">${message}</p>
    `;

    document.querySelector('.chat-messages').appendChild(div);
}
