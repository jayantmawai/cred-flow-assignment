/**
 * Base error class for all application errors in our system. It allows us to
 * tie a cause, status code and message together along with capturing the
 * stacktrace.
 *
 */
module.exports = class AppError extends Error {
  /**
     * Creates a new AppError.
     * @param {string} message - Error message
     * @param {number} httpStatus- A related HTTP error code for this error that
     *  can be sent back to the client
     * @param {Error} cause - The underlying cause of the error that should be
     * logged
     */
  constructor({message, httpStatus, cause}) {
    // Calling parent constructor of base Error class.
    super(message);

    // Saving class name in the property of our custom error as a shortcut.
    this.name = this.constructor.name;

    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor);

    this.httpStatus = httpStatus || 500;
    this.cause = cause;
  }
};
