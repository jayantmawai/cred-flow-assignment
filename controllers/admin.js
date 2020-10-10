const Customer = require('../models/customer');
const UserEmail = require('../models/user_email');
const ClientError = require('../errors').client;
const redis = require('../queue/redis_client');

exports.getAddCustomer = (req, res, next) => {
  res.render('admin/edit-customer', {
    pageTitle: 'Add Customer',
    path: '/api/admin/add-customer',
    editing: false
  });
};

exports.getHomePage = (req, res, next) => {
  res.render('admin/home', {
    pageTitle: 'Home',
    path: '/api/home',
    editing: false
  });
};

exports.postAddCustomer = async(req, res, next) => {
  try{
    console.log(req.body)
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const address = req.body.address;
    const gst_number = req.body.gst_number;
    const frequency = req.body.frequency;
    const result = await Customer.create({
      name: name,
      email: email,
      phone: phone,
      address: address,
      gst_number: gst_number,
      frequency: frequency,
      userId: req.user.id
    });
    console.log('Created Customer');
    return res.json('success!!');
  } 
  catch (e) {
    return next(new ClientError({message: e.message}));
  }
};

exports.getEditCustomer =  async(req, res, next) => {
  try{
    const editMode = req.query.edit;
    if (!editMode) {
      return res.redirect('/');
    }
    const prodId = req.params.customerId;
    const customer = await Customer.findByPk(prodId)
    if (!customer) {
      return res.redirect('/');
    }
    return res.render('admin/edit-customer', {
      pageTitle: 'Edit Customer',
      path: '/api/admin/edit-customer',
      editing: editMode,
      customer: customer
    });
  } 
  catch (e) {
    return next(new ClientError({message: e.message}));
  }
};

exports.postEditCustomer = async(req, res, next) => {
  try{
    const prodId = req.body.customerId;
    const updatedName = req.body.name;
    const updatedEmail = req.body.email;
    const updatedPhone = req.body.phone;
    const updatedAdress = req.body.address;
    const updatedGst_number = req.body.gst_number;
    const updatedFrequency = req.body.frequency;
    const customer =  await Customer.findByPk(prodId);
    customer.name= updatedName;
    customer.email= updatedEmail;
    customer.phone= updatedPhone;
    customer.address= updatedAdress;
    customer.gst_number= updatedGst_number;
    customer.frequency= updatedFrequency;
    customer.save();
    console.log('UPDATED Customer!');
    return res.json('success!!');
  }
  catch (e) {
    return next(new ClientError({message: e.message}));
  }
};

exports.getCustomers = async(req, res, next) => {
  try{
    const customers = await Customer.findAll();
    return res.render('admin/customers', {
      prods: customers,
      pageTitle: 'Admin Customers',
      path: '/api/admin/customers'
    });
  }
  catch (e) {
    return next(new ClientError({message: e.message}));
  }
};

exports.deleteCustomer = async(req, res, next) => {
  try{
    const prodId = req.params.c_id;
    const customer = await Customer.findByPk(prodId);
    const result = await customer.destroy();
    console.log('DESTROYED Customer');
    return res.json('success!!');
  }
  catch (e) {
    return next(new ClientError({message: e.message}));
  }
};

exports.getCustomerDetails = async (req, res, next) => {
  try{
    const c_id = req.params.c_id
    const customer = await Customer.findByPk(c_id);
    const customerEmails = await UserEmail.findAll({ customerId: c_id },{row:true});
    const emails = customerEmails.map((data)=>{
      return data.dataValues;
    });
    console.log(emails);
    return res.render('admin/customer-details', {
      prods: customer.dataValues,
      emails: emails,
      pageTitle: 'Admin Customer',
      path: '/api/admin/customer/'+ c_id,
      editing: false
    });
  }
  catch (e) {
    return next(new ClientError({message: e.message}));
  }
};

exports.postSendEmail = async(req, res, next) => {
  try{
    const customerId = req.params.c_id;
    const customer = await Customer.findByPk(customerId);
    const result = await UserEmail.create({
        email_content: req.body.text,
        email_subject: req.body.subject,
        customerId: customerId
    });
    await redis.create({
      to: customer.email, 
      subject: req.body.subject,
      text: req.body.text
    }, ()=>{
        return res.json('sent');
      });
  }
  catch (e) {
    return next(new ClientError({message: e.message}));
  }
};

exports.getLogin = (req, res, next) => {
  const c_id = req.params.c_id;
  res.render('auth/send-email', {
    path: '/send-email'+ c_id,
    pageTitle: 'Admin Customers',
    customerId:c_id
  });
};
