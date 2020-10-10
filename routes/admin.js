const Schema = require('./schema/admin');
const Controller = require('../controllers/admin');
const Middleware = require('../middleware/is-auth');


module.exports = [
  // apis for customer
  {
    // /admin/add-customer => GET add customer page
    method: 'get',
    route: '/admin/add-customer',
    controller: Controller.getAddCustomer,
  },
  {
    // return customer edit page
    method: 'get',
    route: '/admin/customer/:c_id',
    //schema_validation: Schema.getCustomerDetails,
    controller: Controller.getCustomerDetails,
  },
  {
    // /admin/add-customer => POST add customer
    method: 'post',
    route: '/admin/add-customer',
    middlewares: [
      Middleware.isAuthentic,
    ],
    schema_validation: Schema.postAddCustomer,
    controller: Controller.postAddCustomer,
  },
  {
    // return total user customer
    method: 'get',
    route: '/admin/customers',
    controller: Controller.getCustomers,
  },
  {
    // return customer edit page
    method: 'get',
    route: '/admin/edit-customer/:customerId',
    schema_validation: Schema.getEditCustomer,
    controller: Controller.getEditCustomer,
  },
  {
    // customer edit api
    method: 'post',
    route: '/admin/edit-customer',
    middlewares: [
      Middleware.isAuthentic,
    ],
    schema_validation: Schema.postEditCustomer,
    controller: Controller.postEditCustomer,
  },
  {
    // delete customer
    method: 'delete',
    route: '/admin/delete-customer/:c_id',
    middlewares: [
      Middleware.isAuthentic,
    ],
    schema_validation: Schema.deleteCustomer,
    controller: Controller.deleteCustomer,
  },
  {
    // Home page
    method: 'get',
    route: '/home',
    controller: Controller.getHomePage,
  },
  {
    // Home page
    method: 'post',
    route: '/admin/sendemail/:c_id',
    middlewares: [
      Middleware.isAuthentic,
    ],
    schema_validation: Schema.postSendEmail,
    controller: Controller.postSendEmail,
  },
  {
    // return login page
    method: 'get',
    route: '/send-email/:c_id',
    controller: Controller.getLogin,
  },
];
