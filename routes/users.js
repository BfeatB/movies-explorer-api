const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const { updateProfile, getUserInfo } = require('../controllers/users');

const ROOT = '/users';

module.exports = router
  .get(`${ROOT}/me`, getUserInfo)
  .patch(
    `${ROOT}/me`,
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email().min(2).required(),
        name: Joi.string().min(2).max(30).required(),
      }),
    }),
    updateProfile,
  );
