const Joi = require('joi');

const id = Joi.string().alphanum();
const name = Joi.string().min(3).max(30);

const createSchema = Joi.object({
  name: name.required(),
})

const updateSchema = Joi.object({
  name: name.required(),
})

const getSchema = Joi.object({
  id: id.required(),
})

module.exports = { 
  createSchema,
  updateSchema,
  getSchema,
}
