const db = require('mongoose');

db.Promise = global.Promise;

async function connect(uri) {
  db.connect(uri, {
    useUnifiedTopology: true
  })
    .then(() => console.log('[db] Connected successfully'))
    .catch(err => console.error(`[db] Error: ${err.message}`, err.stack))
}

module.exports = {
  connect,
}