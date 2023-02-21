const Joi = require('joi');

const id = Joi.string().alphanum();
const user = Joi.string().alphanum();
const chat = Joi.string().alphanum();
const content = Joi.string();

const createSchema = Joi.object({
  user: user.required(),
  chat: chat.required(),
  content: content.required(),
})

const updateSchema = Joi.object({
  content: content.required(),
})

const getSchema = Joi.object({
  id: id.required(),
})

const querySchema = Joi.object({
  user,
  chat,
})

module.exports = { 
  createSchema,
  updateSchema,
  getSchema,
  querySchema
}
