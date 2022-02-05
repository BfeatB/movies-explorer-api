const router = require('express').Router();
const { crashTest } = require('../controllers/utils');

module.exports = router
  .get('/crash-test', crashTest);
