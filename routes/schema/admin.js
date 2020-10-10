const {Joi} = require('celebrate');

module.exports = {
  postSendEmail: {
    params: {
      c_id: Joi.number().required(),
    },
    body: Joi.object()
        .keys({
          text: Joi.string().required(),
          subject: Joi.string().required()
        }),
  },
  postAddCustomer: {
    body: Joi.object()
        .keys({
          name: Joi.string().required(),
          email: Joi.string().required(),
          phone: Joi.string().required(),
          address: Joi.string().required(),
          frequency: Joi.number(),
          gst_number: Joi.string(),
        }),
  },
  getEditCustomer: {
    params: {
      customerId: Joi.number().required(),
    },
    query: {
      edit: Joi.string(),
    }
  },
  postEditCustomer: {
    body: Joi.object()
        .keys({
          customerId: Joi.number().required(),
          name: Joi.string().required(),
          email: Joi.string().required(),
          phone: Joi.number().required(),
          address: Joi.string().required(),
          frequency: Joi.number(),
          gst_number: Joi.string(),
        }),
  },
  deleteCustomer: {
    params: {
      c_id: Joi.number().required(),
    },
  },
  postSendEmail: {
    params: {
      c_id: Joi.number().required(),
    },
    body: Joi.object()
        .keys({
          text: Joi.string().required(),
          subject: Joi.string().required()
        }),
  },
  getCustomerDetails: {
    params: {
      c_id: Joi.number(),
    }
  },
};
