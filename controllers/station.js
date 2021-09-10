"use strict";

const axios = require("axios");
const logger = require("../utils/logger");
const stationStore = require("../models/station-store");
const stationAnalytics = require("../utils/station-analytics");
const uuid = require("uuid");

const station = {
  index(request, response) {
                                           //the Station controller is storing pretty much all of the data relating to the the various features of Weather-Top min/max values
                                           //temp conversion data/latest report etc...
                                           //by getting the station using it's Id we can get all the properties relating to every registered station
                                           //on the site.
    const stationId = request.params.id;
    logger.debug("Station id = ", stationId);
    const station = stationStore.getStation(stationId);
    const viewData = {                                   
      name: station.name,                                 //using the stationsId we can get all of the below data from the functions within the stationAnalytics.
      station: station,
      latestReports: stationAnalytics.getLatestReports(station),
      tempF: stationAnalytics.getTempF(station),
      windSpeed: stationAnalytics.getWindSpeed(station),
      temp: stationAnalytics.getTemp(station),
      beaufort: stationAnalytics.getBeafourt(station),
      maxTemp: stationAnalytics.getMaxTemp(station),
      minTemp: stationAnalytics.getMinTemp(station),
      maxWind: stationAnalytics.getMaxWind(station),
      minWind: stationAnalytics.getMinWind(station),
      windChillr: stationAnalytics.getWindChill(station),
      maxP: stationAnalytics.getMaxP(station),
      minP: stationAnalytics.getMinP(station),
      windDir: stationAnalytics.getWindDir(station),
      weatherIcon: stationAnalytics.getWeatherIcon(station),
      tempIcon: stationAnalytics.getTempIcon(station),
      weatherInfo: stationAnalytics.getWeatherInfo(station),
      tempTrend: stationAnalytics.getTempTrend(station),
      windTrend: stationAnalytics.getWindTrend(station),
      pressureTrend: stationAnalytics.getPressureTrend(station),
      lat: stationAnalytics.getLat(station),
      lon: stationAnalytics.getLon(station),
      graphTempTrend: stationAnalytics.getTempTrend(station),
    };
    console.log(station.graphTempTrend);                      //Passing all the data to the station view
    response.render("station", viewData);
  },

  deleteReading(request, response) {             //deleteReading works similare to the the deleteStation method 
                                                 // utilising the station and reading Id's we can pass that information into the removeReading function, which
                                                // willfind the relevant reading and remove it from the readings list.
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    logger.debug(`Deleting Reading ${readingId} from Station ${stationId}`);
    stationStore.removeReading(stationId, readingId);
    response.redirect("/station/" + stationId);
  },

  addReading(request, response) {                    //addReading takes in data from the form located on the station dashboard, we once again utilise the Id's of the station and playlist
                                                     //the data is then sent to the stationStore where it will be added and saved to the relevant stations readings list
    const date = new Date().toLocaleString();
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    const newReading = {
      id: uuid.v1(),
      date: date,
      code: request.body.code,
      temp: request.body.temp,
      windSpeed: Number(request.body.windSpeed),
      pressure: Number(request.body.pressure),
      windDirection: Number(request.body.windDirection)
    };
    logger.debug("New Reading = ", newReading);
    stationStore.addReading(stationId, newReading);
    response.redirect("/station/" + stationId);
  },

  async addreport(request, response) {             //This function is responsible for our automatically generated reports, using the axios library
                                                   //We make sure to pull in the stations Id here so that we can save the data coming in from the API request,
    const date = new Date().toLocaleString();
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    logger.info("rendering new report");
    let report = {};
    const lat = stationAnalytics.getLat(station);       //Because our API needs latitude and longitude information to function we get the lat and lon from the stations themselves so that it's consistent
    const lng = stationAnalytics.getLon(station);       //This allows us to have accurate weather data provided the station is using real-life coordinates to match the station.
    const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=2bc4cb07cba2bb89cb7320f0f459b280`;
    const result = await axios.get(requestUrl);
    if (result.status == 200) {
      const reading = result.data.current;          //We are grabbing the data coming in from the api and storing them into properties so that we can use them elsewhere.
      report.code = reading.weather[0].id;
      report.temperature = reading.temp;
      report.windSpeed = reading.wind_speed;
      report.pressure = reading.pressure;
      report.windDirection = reading.wind_deg;
      
      report.tempTrend = [];                 //Here is where we are getting date in for the frappe graph.
      report.trendLabels = [];
      const trends = result.data.daily;
      for (let i = 0; i < trends.length; i++) {
        report.tempTrend.push(trends[i].temp.day);
        const date = new Date(trends[i].dt * 1000);
        report.trendLabels.push(
          `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
        );
      }
    }
    const newReading = {    // We are using the newReading function here to store the information gathered by the API into a newReadind so that we can automatically generate the report and have it
                          //save into our readings list directly from here with the addReading method.
      id: uuid.v1(),
      date: date,
      code: report.code,
      temp: report.temperature,
      windSpeed: report.windSpeed,
      pressure: report.pressure,
      windDirection: report.windDirection
    };
              
    stationStore.addReading(stationId, newReading);         //I encountered a bug where my graph would not work on the station screen and instead would only work after post but on an empty station view, with no data whatsoever on it,
                                                         //to get around this I'm passing all the below data with it again so that the station information is displayed as well as the graph, this was the only way I found that I could make it
                                                        //work
    const viewData = {
      name: station.name,
      reading: report,
      station: station,
      latestReports: stationAnalytics.getLatestReports(station),
      tempF: stationAnalytics.getTempF(station),
      windSpeed: stationAnalytics.getWindSpeed(station),
      temp: stationAnalytics.getTemp(station),
      beaufort: stationAnalytics.getBeafourt(station),
      maxTemp: stationAnalytics.getMaxTemp(station),
      minTemp: stationAnalytics.getMinTemp(station),
      maxWind: stationAnalytics.getMaxWind(station),
      minWind: stationAnalytics.getMinWind(station),
      windChillr: stationAnalytics.getWindChill(station),
      maxP: stationAnalytics.getMaxP(station),
      minP: stationAnalytics.getMinP(station),
      windDir: stationAnalytics.getWindDir(station),
      weatherIcon: stationAnalytics.getWeatherIcon(station),
      tempIcon: stationAnalytics.getTempIcon(station),
      weatherInfo: stationAnalytics.getWeatherInfo(station),
      tempTrend: stationAnalytics.getTempTrend(station),
      windTrend: stationAnalytics.getWindTrend(station),
      pressureTrend: stationAnalytics.getPressureTrend(station),
      lat: stationAnalytics.getLat(station),
      lon: stationAnalytics.getLon(station),
      graphTempTrend: stationAnalytics.getTempTrend(station),
    };
    console.log("/station/"+ stationId);
    response.render("station", viewData);
  },
};

module.exports = station;
