const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const { createUser, login } = require('../controllers/users');

module.exports = router
  .post(
    '/signin',
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
      }),
    }),
    login,
  )
  .post(
    '/signup',
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().min(2),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
      }),
    }),
    createUser,
  );
