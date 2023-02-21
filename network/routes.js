const express = require("express");

/* ROUTERS */
const messages = require('../components/messages/network');
const users = require('../components/users/network');
const chats = require('../components/chats/network');

function routes(app) {
  const router = express.Router();
  app.use('/api', router);

  router.use('/messages', messages);
  router.use('/users', users);
  router.use('/chats', chats);
}

module.exports = routes;
