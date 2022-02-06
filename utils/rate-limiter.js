const rateLimit = require('express-rate-limit');

// 1 request per second
const limiter = rateLimit({
  windowMs: 1000,
  max: 1,
  standardHeaders: true,
  legacyHeaders: false,
});
module.exports = limiter;
