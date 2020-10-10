const ClientError = require('./client');

/**
* Error class that represents an Unauthorized 401 HTTP errors related to
* invalid or missing credentials.
*
*/
module.exports = class TokenError extends ClientError {
  /**
  * Creates a new TokenError.
  * @param {string} message - Error message
  * @param {Error} cause - The underlying cause of the error that should
  *
  */
  constructor({message, cause}) {
    // Set the status to 401
    const httpStatus = 401;
    const updatedMessage = message || 'Unauthorized. Missing or invalid token';
    super({message: updatedMessage, httpStatus: httpStatus, cause: cause});
  }
};
