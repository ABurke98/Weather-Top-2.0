"use strict"; //Accounts controller for storing data related to the user account

const userstore = require("../models/user-store"); //Defining some of the variables which we use later in the controller
const logger = require("../utils/logger");
const uuid = require("uuid");
const stationStore = require("../models/station-store");

const accounts = {
  index(request, response) {
    //Displaying the log in and sign up view to the non logged in user when entering the site
    const viewData = {
      title: "Login or Signup"
    };
    response.render("index", viewData);
  },

  login(request, response) {
    //Loading the login view
    const viewData = {
      title: "Login to the Service"
    };
    response.render("login", viewData);
  },

  logout(request, response) {
    //Loading the logout view
    response.cookie("playlist", "");
    response.redirect("/");
  },

  editview(request, response) {
    //Loading the edit user view
    const viewData = {
      title: "Edit your account"
    };
    response.render("updateuser", viewData);
  },

  signup(request, response) {
    const viewData = {
      title: "Login to the Service"
    };
    response.render("signup", viewData);
  },

  updateUser(request, response) {                       //the updateUser function loads in the current user using the getCurrentUser function
                                                        //the updatedUser object gets the entered user information and then sends it to the 
                                                        //updateUser function in the userstore where it gets updated and saved.
    const user = accounts.getCurrentUser(request);
    const updatedUser = {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      password: request.body.password
    };
    userstore.updateUser(user, updatedUser);
    response.redirect("/login");
  },

  register(request, response) {          //Similar to the function above, register gets data from the registration form and passes it to the
                                         //addUser function in the userstore and gets saved as a new user there.
    const user = request.body;
    user.id = uuid.v1();
    userstore.addUser(user);
    logger.info(`registering ${user.email}`);
    response.redirect("/");
  },

  authenticate(request, response) {                                 //The authenticate funtion uses the getUserByEmail function and getUserByPassword
                                                                    //It then checks to make sure that the provided email and password match, if that's true
                                                                    //Then the user is logged in to the dashboard and given their cookie.
    const user = userstore.getUserByEmail(request.body.email);
    const password = userstore.getUserByPassword(request.body.password);
    if (user && password) {
      response.cookie("station", user.email);
      logger.info(`logging in ${user.email}`);
      response.redirect("/dashboard");
    } else {
      response.redirect("/login");
    }
  },

  getCurrentUser(request) {                           //A simple function for getting the current logged in user by checking the cookie.
    const userEmail = request.cookies.station;
    return userstore.getUserByEmail(userEmail);
  }
};

module.exports = accounts;
