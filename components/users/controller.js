const store = require('./store');

function addUser(name) {
  const user = {
    name,
  }
    
  return store.add(user);
}

function getUsers() {
  return store.list();
}

function updateUser(id, content) {
  return store.updateName(id, content);
}

function deleteUser(id) {
  return store.delete(id);
}

module.exports = {
  addUser,
  getUsers,
  updateUser,
  deleteUser,
}