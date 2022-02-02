const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const { updateProfile, getUserInfo } = require('../controllers/users');

router.get('/me', getUserInfo);
router.patch(
  '/me',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().min(2),
      about: Joi.string().required().min(2),
    }),
  }),
  updateProfile,
);

module.exports = router;