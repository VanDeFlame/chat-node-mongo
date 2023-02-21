const Model = require('./model');

function addUser(user) {
  const newUser = new Model(user);
  return newUser.save();
}

async function getUsers() {
  return Model.find();
}

async function updateName(id, name) {
  return Model.findOneAndUpdate(
    { _id: id },
    { name },
    { new: true }
  )
}

function deleteUser(id) {
  return Model.deleteOne({
    _id: id
  });
}

module.exports = {
  add: addUser,
  list: getUsers,
  // get: getUser,
  // update: updateUser,
  updateName,
  delete: deleteUser,
}