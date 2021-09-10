"use strict";


const logger = require("../utils/logger");             
const stationStore = require("../models/station-store");
const uuid = require("uuid");
const accounts = require ('./accounts.js');


const dashboard = {              //The Dashboard function is given to the user upon logging in, we get the logged in user and then use
                                 //the users ID for getting any stations created by that user in the JSON store.
  index(request, response) {
    logger.info('dashboard rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: 'Station Dashboard',
      stations: stationStore.getUserStation(loggedInUser.id),
    };
    logger.info('about to render', stationStore.getAllStations());      //Printing the users stations to the console
    response.render('dashboard', viewData);
  },
  
  
  deleteStation(request, response) {                   //The deleteStation function, requests the stationsId, that id is then passed to the stationStore
                                                       //to the removeStation method which will remove the station as well as save the station Store.
    const stationId = request.params.id;
    logger.debug(`Deleting Station ${stationId}`);
    stationStore.removeStation(stationId);
    response.redirect("/dashboard");
  },
  
    addStation(request, response) {                           //The addstation function takes in data from the form on the Dashboard screen, we get the users Id,
                                                              //and then we add on the userId so that the addStation method in stationStore knows which user has created
                                                              //the station and save it to their account accordingly it also creates a readings list within the users stations.
    const loggedInUser = accounts.getCurrentUser(request);
    const newStation = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      date: request.body.date,      //We do not enter the date, it is automatically taken in when the form is posted.
      name: request.body.name,
      lat: request.body.lat,
      lon: request.body.lon,
      readings: [],
    };
    logger.debug('Creating a new Station', newStation);
    stationStore.addStation(newStation);
    response.redirect('/dashboard');
  },
};


module.exports = dashboard;

