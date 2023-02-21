const express = require('express');

const response = require('./../../network/response');
const controller = require('./controller');
const validatorHandler = require('./../../network/middlewares/validator.handler')
const { uploadFile } = require('./../../network/middlewares/multer.handler')
const { createSchema, updateSchema, getSchema, querySchema } = require('./schema');

const router = express.Router();

router.get('/',
  validatorHandler(querySchema, 'query'),
  async (req, res, next) => {
    controller.getMessages(req.query)
      .then((rta) => response.success(req, res, rta, 200))
      .catch((err) => next({
        response: 'Unexpected Error',
        status: 500,
        ...err
      }));
  }
);

router.post('/create',
  uploadFile.single('file'),
  validatorHandler(createSchema, 'body'),
  async (req, res, next) => {
    controller.addMessage(req.body.chat, req.body.user, req.body.content, req.file)
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
    controller.updateMessage(req.params.id, req.body.content)
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
    controller.deleteMessage(req.params.id)
      .then((rta) => response.success(req, res, rta, 200))
      .catch((err) => next({
        response: 'Unexpected Error',
        status: 500,
        ...err
      }));
  }
);

module.exports = router;