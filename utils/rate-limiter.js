const rateLimit = require('express-rate-limit');

// 1 requests per second
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
});
module.exports = limiter;
