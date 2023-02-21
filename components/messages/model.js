const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  chat: {
    type: Schema.ObjectId,
    ref: 'Chat',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date
  },
  file: {
    type: String
  },
});

const model = mongoose.model('Message', mySchema);
module.exports = model;