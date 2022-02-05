const { CrashServerMessage } = require('../utils/consts');

function crashTest() {
  setTimeout(() => {
    throw new Error(CrashServerMessage);
  }, 0);
}

module.exports = {
  crashTest,
};
