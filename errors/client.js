const AppError = require('./app');

/**
 * Error class that represents a generic client side error (4xx).
 * Defaults to 400 http status code.
 *
 */
module.exports = class ClientError extends AppError {
  /**
     * Creates a new ClientError.
     * @param {string} message - Error message
     * @param {number} httpStatus- A related HTTP error code for this error that
     * can be sent back to the client
     * @param {Error} cause - The underlying cause of the error that should be
     * logged
     */
  constructor({message, httpStatus, cause}) {
    const status = httpStatus || 400;
    super({message: message, httpStatus: status, cause: cause});
  }
};
