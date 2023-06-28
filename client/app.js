const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

const socket = io();
socket.on('message', ({author, content}) => {
  addMessage(author, content);
});

let userName = '';
const messages = [];

function login(e){
  e.preventDefault();
  const userNameContent = userNameInput.value;

  if(userNameContent === ''){
    alert('Please enter your name.');
    return;
  }

  userName = userNameContent;
  console.log('userName:', userName);
  loginForm.classList.remove('show');
  messagesSection.classList.add('show');
  socket.emit('login', userName);
};
function sendMessage(e){
  e.preventDefault();
  const messageContent = messageContentInput.value;

  if(!messageContent.length)
    alert('You have to type something!');
  else{
    addMessage(userName, messageContent);
    socket.emit('message', {author: userName, content: messageContent})
    messageContentInput.value = '';
  }
};
function addMessage(author, content){
  const message = document.createElement('li');
  const chatBotName = 'Chat Bot';
  message.classList.add('message');
  message.classList.add('message--received');

  if(author === userName)
    message.classList.add('message--self');
  else if(author === chatBotName)
    message.classList.add('message--chat-bot');

  message.innerHTML = `
    <h3 class="message__author">${userName === author ? 'You' : author}</h3>
    <div class="message__content">
      ${content}
    </div>
  `;
  messagesList.appendChild(message);
};

loginForm.addEventListener('submit', login);
addMessageForm.addEventListener('submit', sendMessage);
userNameInput.setAttribute('autocomplete', 'off');
messageContentInput.setAttribute('autocomplete', 'off');