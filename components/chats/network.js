const express = require('express');

const response = require('./../../network/response');
const controller = require('./controller.js');
const validatorHandler = require('./../../network/middlewares/validator.handler')
const { createSchema, updateSchema, getSchema, querySchema } = require('./schema');

const router = express.Router();

router.get('/',
  validatorHandler(querySchema, 'query'),
  async (req, res, next) => {
    controller.getChats(req.query)
      .then((rta) => response.success(req, res, rta, 200))
      .catch((err) => next({
        response: 'Unexpected Error',
        status: 500,
        ...err
      }));
  }
);

router.get('/:id',
  validatorHandler(getSchema, 'params'),
  async (req, res, next) => {
    controller.getChat(req.params.id)
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
    controller.addChat(req.body.users)
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
    controller.updateChat(req.params.id, req.body.users)
      .then((rta) => response.success(req, res, rta, 200))
      .catch((err) => next({
        response: 'Invalid Data',
        status: 400,
        ...err
      }));
  }
);

// router.delete('/:id',
//   validatorHandler(getSchema, 'params'),
//   async (req, res, next) => {
//     controller.deleteChat(req.params.id)
//       .then((rta) => response.success(req, res, rta, 200))
//       .catch((err) => next({
//         response: 'Unexpected Error',
//         status: 500,
//         ...err
//       }));
//   }
// );

module.exports = router;