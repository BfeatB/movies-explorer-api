const router = require('express').Router();

const { NotFoundError } = require('../utils');
const { signinValidator, signupValidator } = require('../utils/validation');
const { createUser, login } = require('../controllers/users');
const { crashTest } = require('../controllers/utils');

const auth = require('../middlewares/auth');
const users = require('./users');
const movies = require('./movies');

module.exports = router
  .post(
    '/signin',
    signinValidator,
    login,
  )
  .post(
    '/signup',
    signupValidator,
    createUser,
  )
  .get('/crash-test', crashTest)
  .use(auth)
  // these routes are under a11n
  .use(users)
  .use(movies)
  .use('*', () => {
    throw new NotFoundError('Not implemented');
  });
