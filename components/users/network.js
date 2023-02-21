const express = require('express');

const response = require('./../../network/response');
const controller = require('./controller');
const validatorHandler = require('./../../network/middlewares/validator.handler')
const { createSchema, updateSchema, getSchema } = require('./schema');

const router = express.Router();

router.get('/',
  async (req, res, next) => {
    controller.getUsers()
      .then((rta) => response.success(req, res, rta, 200))
      .catch((err) => next({
        response: 'Unexpected Error',
        status: 500,
        ...err
      }));
  }
);

router.post('/create',
  validatorHandler(createSchema, 'body'),
  async (req, res, next) => {
    controller.addUser(req.body.name)
      .then((rta) => response.success(req, res, rta, 201))
      .catch((err) => next({
        response: 'Invalid Data',
        status: 400,
        ...err
      }));
  }
);

router.patch('/:id',
  validatorHandler(getSchema, 'params'),
  validatorHandler(updateSchema, 'body'),
  async (req, res, next) => {
    controller.updateUser(req.params.id, req.body.name)
      .then((rta) => response.success(req, res, rta, 200))
      .catch((err) => next({
        response: 'Invalid Data',
        status: 400,
        ...err
      }));
  }
);

router.delete('/:id',
  validatorHandler(getSchema, 'params'),
  async (req, res, next) => {
    controller.deleteUser(req.params.id)
      .then((rta) => response.success(req, res, rta, 200))
      .catch((err) => next({
        response: 'Unexpected Error',
        status: 500,
        ...err
      }));
  }
);

module.exports = router;