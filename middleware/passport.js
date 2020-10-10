const passport = require('passport');

const passportJWT = require('passport-jwt');

const TokenError = require('../errors').token;
const ServerError = require('../errors').server;
const User = require('../models/user');

const JwtStrategy = passportJWT.Strategy;
const extractJwt = passportJWT.ExtractJwt;

exports.jwtStrategyCallback = async (jwtPayload, done) => {
  try {
    if (!jwtPayload) {
      return done(new TokenError({message: 'Credentials missing'}));
    }

    const id = jwtPayload.data.id;
    const user = await User.findByPk(id);

    if (!user) {
      return done(new TokenError({message: 'Credentials invalid'}));
    }

    return done(null, user);
  } catch (err) {
    return done(new ServerError(
        {
          message: 'Got an error in JWT Strategy Callback',
          cause: err,
        }));
  }
};
passport.use(new JwtStrategy({
  jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'JAYANT_JWT_SECRET_KEY',
}, exports.jwtStrategyCallback));
