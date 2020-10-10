const {Joi} = require('celebrate');

module.exports = {
  postLogin: {
    body: Joi.object()
        .keys({
          email: Joi.string().required(),
          password: Joi.string().required()
        }),
  },
  postSignup: {
    body: Joi.object()
        .keys({
          name: Joi.string().required(),
          email: Joi.string().required(),
          password: Joi.number().required(),
          confirmPassword: Joi.string().required()
        }),
  }
};
