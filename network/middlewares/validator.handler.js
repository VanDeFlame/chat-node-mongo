const response = require('./../response');

function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property]
    const { error } = schema.validate(data, {
      abortEarly: false
    })

    if (error) {
      next({
        response: 'Invalid Data',
        status: 400,
        message: error.message
      });
    }
    next();
  }
}

module.exports = validatorHandler;
