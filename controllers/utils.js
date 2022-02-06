const { SERVER_CRASH_ERROR_MESSAGE } = require('../utils/consts');

function crashTest() {
  setTimeout(() => {
    throw new Error(SERVER_CRASH_ERROR_MESSAGE);
  }, 0);
}

module.exports = {
  crashTest,
};
