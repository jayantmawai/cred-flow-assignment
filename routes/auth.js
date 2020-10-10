const express = require('express');
const Schema = require('./schema/auth');
const Controller = require('../controllers/auth');
const authJwt = require('../middleware/is-auth');

module.exports = [
  // apis for auth
  {
    // Register a new user
    method: 'post',
    route: '/signup',
    schema_validation: Schema.postSignup,
    controller: Controller.postSignup,
  },
  {
    // logs in an user
    method: 'post',
    route: '/login',
    schema_validation: Schema.postLogin,
    controller: Controller.postLogin,
  },
  {
    // return login page
    method: 'get',
    route: '/login',
    controller: Controller.getLogin,
  },
  {
    // return signup page
    method: 'get',
    route: '/signup',
    controller: Controller.getSignup,
  },
];
