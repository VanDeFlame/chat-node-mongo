const express = require('express');
const cors = require('cors');
const app = express();

const server = require('http').Server(app);
const socket = require('./socket');
const config = require('./config');
const db = require('./db');
const routes = require('./network/routes');
const errorHandlers = require('./network/middlewares/error.handler');

db.connect(config.dbUri);
socket.connect(server);

/* CORS */
const whitelist = ['http://localhost:8080', 'http://127.0.0.1:5550', undefined]
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Petition Origin not allowed'))
    }
  }
}

app.use(express.json());
app.use(cors(options));
app.use(errorHandlers.logErrors);
app.use(errorHandlers.errorHandler);

routes(app);
app.use('/app', express.static('public'));

server.listen(config.port, () =>{
  console.log(`Listen at ${config.host}:${config.port}`);
});