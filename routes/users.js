const router = require('express').Router();
const { updateProfileValidator } = require('../utils/validation');
const { updateProfile, getUserInfo } = require('../controllers/users');

const ROOT = '/users';

module.exports = router
  .get(`${ROOT}/me`, getUserInfo)
  .patch(
    `${ROOT}/me`,
    updateProfileValidator,
    updateProfile,
  );
