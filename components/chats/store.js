const Model = require('./model');

function addChat(chat) {
  const newChat = new Model(chat);
  return newChat.save();
}

function getChats(filter) {
  return new Promise((resolve, reject) => {
    Model.find(filter, '-messages')
      .populate('users')
      .exec((err, populated) => {
        if (err) reject(err);
        resolve(populated);
      });
  });
}

function getChat(id) {
  return new Promise((resolve, reject) => {
    
    Model.findById(id)
      .populate('users')
      .populate('messages')
      .exec((err, populated) => {
        if (err) reject(err);
        resolve(populated);
      });
  });
}

function updateUsers(id, users) {
  return Model.findOneAndUpdate(
    { _id: id },
    { users },
    { new: true }
  );
}

function deleteChat(id) {
  return Model.deleteOne({
    _id: id
  });
}

module.exports = {
  add: addChat,
  list: getChats,
  get: getChat,
  // update: updateChat,
  updateUsers,
  delete: deleteChat,
}