"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store");
const stationAnalytics = require("../utils/station-analytics");
const uuid = require("uuid");

const station = {
  index(request, response) {
    const stationId = request.params.id;
    logger.debug("Station id = ", stationId);
    const station = stationStore.getStation(stationId);
    const viewData = {
      name: station.name,
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
      pressureTrend: stationAnalytics.getPressureTrend(station)
    };
    response.render("station", viewData);
  },

  deleteReading(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    logger.debug(`Deleting Reading ${readingId} from Station ${stationId}`);
    stationStore.removeReading(stationId, readingId);
    response.redirect("/station/" + stationId);
  },

  addReading(request, response) {
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    const newReading = {
      id: uuid.v1(),
      code: request.body.code,
      temp: request.body.temp,
      windSpeed: Number(request.body.windSpeed),
      pressure: Number(request.body.pressure),
      windDirection: Number(request.body.windDirection)
    };
    logger.debug("New Reading = ", newReading);
    stationStore.addReading(stationId, newReading);
    response.redirect("/station/" + stationId);
  }
};

module.exports = station;
