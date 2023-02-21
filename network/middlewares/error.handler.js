function logErrors (err, req, res, next) {
  let type = '[Error]';
  if (err.status >= 500) type = '[Server Error]';
  else if (err.status >= 400) type = '[Request Error]';

  console.error(`\n${type} ${err.message ?? err.reason}`);
  if (!err.message) console.error(err);
  
  next(err)
}

function errorHandler (err, req, res, next) {
  res.status(err.status || 500).send({
    error: err.response,
    data: {}
  })
}

module.exports = {
  logErrors,
  errorHandler
}
