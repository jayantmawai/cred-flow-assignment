const AppError = require('./app');

/**
* Error class that represents an Internal Server Error. Anything that should
* be a 500.
*
*/
module.exports = class ServerError extends AppError {
  /**
  * Creates a new ServerError.
  * @param {string} message - Error message
  * @param {number} httpStatus - A related HTTP error code for this error that
  *  can be sent back to the client
  * @param {Error} cause - The underlying cause of the error that should
  *  be logged
  */
  constructor({message, httpStatus, cause}) {
    const updatedMessage = message ||
        'Looks like something went wrong. ' +
        'Please wait and try again in a few minutes.';
    const status = httpStatus || 500;
    super(
        {message: updatedMessage, httpStatus: status, cause: cause},
    );
  }
};
