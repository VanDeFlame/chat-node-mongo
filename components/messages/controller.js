const store = require('./store');
const config = require('./../../config');
const { socket } = require('./../../socket');

function addMessage(chat, user, msg, file) {
  const message = {
    user: user,
    chat: chat,
    content: msg,
    date: new Date(),
  }
  
  if (file) {
    message.file = `${config.host}:${config.port}/app/files/${file.filename}`
  }

  socket.io.emit('message', message);
  return store.add(message);
}

function getMessages(query) {
  const filter = {};
  if (query.user) {
    filter.user = query.user;
  }
  if (query.chat) {
    filter.chat = query.chat;
  }

  return store.list(filter);
}

function updateMessage(id, content) {
  return store.updateContent(id, content);
}

function deleteMessage(id) {
  return store.delete(id);
}

module.exports = {
  addMessage,
  getMessages,
  updateMessage,
  deleteMessage,
}