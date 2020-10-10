const passport = require('passport');
const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const ClientError = require('../errors/client');

/**
 * This method checks if the customer is authenticated or not and assigns
 * the {@link req.user}
 * parameter to the customer object if authenticated.
 * If the customer is not authenticated,
 * it throws an 401.
 *
 */
exports.isAuthentic = passport.authenticate('jwt', {session: false});

/**
 * This method checks if user id passed via param is valid or not
 * and returns 401 if its invalid
 */
exports.checkUserExists = asyncHandler(async (req, res, next) => {
  const {id} = req.params;
  const user =await User.findByPk(id);
  if (!user) {
    return next(new ClientError({message: `User not found for id: ${id}`}));
  }
  next();
});