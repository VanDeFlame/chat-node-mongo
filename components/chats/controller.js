const store = require('./store');

function addChat(users) {
  const chat = {
    users,
  }

  return store.add(chat);
}

function getChats(query) {
  const filter = {};
  if (query.user) {
    filter.users = query.user;
  }

  return store.list(filter);
}

function getChat(id) {
  return store.get(id);
}

function updateChat(id, users) {
  return store.updateUsers(id, users);
}

function deleteChat(id) {
  return store.delete(id);
}

module.exports = {
  addChat,
  getChats,
  getChat,
  updateChat,
  deleteChat,
}