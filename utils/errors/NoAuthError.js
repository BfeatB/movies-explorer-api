module.exports = class NoAuthError extends Error {
    constructor(message) {
      super(message);
      this.name = 'NoAuthError';
      this.statusCode = 401;
    }
  };