module.exports = class NoAccessError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NoAccessError';
    this.statusCode = 403;
  }
};
