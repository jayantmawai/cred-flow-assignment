const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ClientError = require('../errors').client;

const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: message
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  return res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: message
  });
};

exports.postLogin = async(req, res, next) => {
  try{
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email: email });
    if (!user) {
      req.flash('error', 'Invalid email or password.');
      console.log('HIii');
      return res.redirect('/api/login');
    }
    const doMatch = await bcrypt.compare(password, user.password);
    if (!doMatch) {
      console.log('heyyy');
      req.flash('error', 'Invalid email or password.');
      res.redirect('/api/login');
    }
    const token = await jwt.sign({data: {id:user.id}}, 'JAYANT_JWT_SECRET_KEY', { expiresIn: '7200s' });
    return res.redirect('/api/home?token='+token);              
    //res.redirect('/api/admin/customers');
  }
  catch (e) {
    return next(new ClientError({message: e.message}));
  }
};

exports.postSignup = async (req, res, next) => {
  try{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const userDoc =  await User.findOne({ where: { email: email } });
    if(name =='' || email=='' || password == ''){
      req.flash('error', 'Invalid inputs, please pick a different one!');
      return res.redirect('/signup');
    }
    if (userDoc) {
      req.flash('error', 'E-Mail exists already, please pick a different one!');
      return res.redirect('/signup');
    }
    const hashedPassword =  await bcrypt.hash(password, 12);
    console.log("jayant");
    const result = await User.create({
          name: name,
          email: email,
          password: hashedPassword
        });
    // console.log(result);
    console.log('Created Customer');
    return res.redirect('/login');
  }
  catch (e) {
    return next(new ClientError({message: e.message}));
  }
};