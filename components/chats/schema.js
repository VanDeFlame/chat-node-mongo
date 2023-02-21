const Joi = require('joi');

const id = Joi.string().alphanum();
const user = Joi.string().alphanum();
const users = Joi.array().items(user).min(1);

const createSchema = Joi.object({
  users: users.required(),
})

const updateSchema = Joi.object({
  users: users.required(),
})

const getSchema = Joi.object({
  id: id.required(),
})

const querySchema = Joi.object({
  user,
})

module.exports = { 
  createSchema,
  updateSchema,
  getSchema,
  querySchema,
}
