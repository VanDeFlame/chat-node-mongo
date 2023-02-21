const Model = require('./model');
const ChatModel = require('./../chats/model');

function addMessage(msg) {
  const message = new Model(msg);
  ChatModel.findByIdAndUpdate(
    message.chat,
    { '$push': { messages: message.id } }
  ).catch(err => console.error(err))

  return message.save();
}

function getMessages(filter) {
  return new Promise((resolve, reject) => {
    Model.find(filter)
      .populate('user')
      .exec((err, populated) => {
        if (err) reject(err);
        resolve(populated);
      });
  });
}

function updateContent(id, content) {
  return Model.findOneAndUpdate(
    { _id: id },
    { content },
    { new: true }
  );
}

function deleteMessage(id) {
  return Model.deleteOne({
    _id: id
  });
}

module.exports = {
  add: addMessage,
  list: getMessages,
  // get: getMessage,
  // update: updateMessage,
  updateContent,
  delete: deleteMessage,
}