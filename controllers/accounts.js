'use strict';

const userstore = require('../models/user-store');
const logger = require('../utils/logger');
const uuid = require('uuid');
const stationStore = require('../models/station-store')


const accounts = {

  index(request, response) {
    const viewData = {
      title: 'Login or Signup',
    };
    response.render('index', viewData);
  },

  login(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('login', viewData);
  },

  logout(request, response) {
    response.cookie('playlist', '');
    response.redirect('/');
  },
  
    editview(request, response) {
    const viewData = {
      title: 'Edit your account',
    };
    response.render('updateuser', viewData);
  },

  signup(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('signup', viewData);
  },
  
  updateUser(request, response){
    const user = accounts.getCurrentUser(request);
    const updatedUser = {
      firstName: request.body.firstName,
      lastName : request.body.lastName,
      email : request.body.email,  
      password : request.body.password,
    }
    userstore.updateUser(user, updatedUser);
    response.redirect('/login');
  },

  register(request, response) {
    const user = request.body;
    user.id = uuid.v1();
    userstore.addUser(user);
    logger.info(`registering ${user.email}`);
    response.redirect('/');
  },
  
  authenticate(request, response) {
    const user = userstore.getUserByEmail(request.body.email);
    const password = userstore.getUserByPassword(request.body.password);
    if (user&&password) {
      response.cookie('playlist', user.email);
      logger.info(`logging in ${user.email}`);
      response.redirect('/dashboard');
    } else {
      response.redirect('/login');
    }
  },

  getCurrentUser(request) {
    const userEmail = request.cookies.playlist;
    return userstore.getUserByEmail(userEmail);
  },
};

module.exports = accounts;