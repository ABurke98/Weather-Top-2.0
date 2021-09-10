"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");

const stationStore = {                     //The stationStore model is holding the functions that are relating to any updating or creating or data storage.
  store: new JsonStore("./models/station-store.json", {
    stationCollection: []
  }),
  collection: "stationCollection",

  getAllStations() {                                   //Getting all stations in the collection
    return this.store.findAll(this.collection);
  },

  getStation(id) {                                       //Getting a specific station by it's Id
    return this.store.findOneBy(this.collection, { id: id });
  },

  addStation(station) {                            //Taking in station data from the controllers and then saving it.
    this.store.add(this.collection, station);
    this.store.save();
  },
  
  removeStation(id) {                              //Taking in station data from the controllers and then removing it.
    const station = this.getStation(id);
    this.store.remove(this.collection, station);
    this.store.save();
  },

  removeAllStations() {                             //Function to delete all stations within the collection
    this.store.removeAll(this.collection);
    this.store.save();
  },

  addReading(id, reading) {                         //Function that takes in reading data and then saves it to the readings collection
    const station = this.getStation(id);
    station.readings.push(reading);
    this.store.save();
  },
  
  
  removeReading(id, readingId) {           //Function that takes in reading data and then removes it to the readings collection
    const station = this.getStation(id);
    const readings = station.readings;
    _.remove(readings, { id: readingId });
    this.store.save();
  },
  
  getUserStation(userid) {                                         //function to get stations of a specific user by using it's ID, then displaying it alphabetically
    let stations = this.store.findBy(this.collection, { userid: userid});
    const orderedStations = _.sortBy(stations, o => o.name)
    return orderedStations;
  },
  
  getReading(id, readingId) {                              //function to get readings of a specfic station by using it's Id
    const station = this.store.findOneBy(this.collection, { id: id });
    const readings = station.readings.filter(reading => reading.id == readingId);
    return readings[0];
  },
  
};

module.exports = stationStore;
