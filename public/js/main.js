const chatForm = document.getElementById('chat-form');
const socket = io();
const chatMessages = document.querySelector('.chat-messages')

//Pegar username e sala da URL
const { username, room } = Qs.parse(location.search, {
   ignoreQueryPrefix: true
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
