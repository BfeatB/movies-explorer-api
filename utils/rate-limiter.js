const rateLimit = require('express-rate-limit');

// 100 requests per minute
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
module.exports = limiter;
