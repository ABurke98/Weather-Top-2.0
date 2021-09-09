"use strict";

const station = require("../controllers/station");
const readings = require("../controllers/reading");
const stationAnalytics = {
  getLatestReports(station) {
    let latestReports = null;
    if (station.readings.length > 0) {
      latestReports = station.readings[0];
      for (let i = 1; i < station.readings.length; i++) {
        latestReports = station.readings[station.readings.length - 1];
      }
    }
    return latestReports;
  },
  

  getTempF(station) {
    if (station.readings.length > 0) {
      let tempF = 0;
      let latestReports = stationAnalytics.getLatestReports(station);
      tempF += latestReports.temp * 1.8 + 32;
      return tempF;
    }
  },

  getMaxTemp(station) {
    if (station.readings.length > 0) {
      let maxTemp = 0;
      let latestReports = stationAnalytics.getLatestReports(station);
      if (station.readings.length > 0) {
        let maxTemp = station.readings[0];
      }
      for (let i = 0; i < station.readings.length; i++) {
        if (station.readings[i].temp > maxTemp) {
          maxTemp = station.readings[i].temp;
        }
      }
      return maxTemp;
    }
  },
  
  getMinTemp(station) {
    if (station.readings.length > 0) {
      let maxTemp = stationAnalytics.getMaxTemp(station);
      let minTemp = maxTemp;
      let latestReports = stationAnalytics.getLatestReports(station);
      if (station.readings.length > 0) {
        let minTemp = station.readings[0];
      }
      for (let i = 0; i < station.readings.length; i++) {
        if (station.readings[i].temp < minTemp) {
          minTemp = station.readings[i].temp;
        }
      }
      console.log(minTemp);
      return minTemp;
    }
  },


  getBeafourt(station) {
    if (station.readings.length > 0) {
      let beafourt = 0;
      let windSpeed = 0;
      let latestReports = stationAnalytics.getLatestReports(station);
      windSpeed += latestReports.windSpeed;
      if (windSpeed == 0) {
        return 0;
      } else if (windSpeed >= 1 && windSpeed <= 6) {
        return 1;
      } else if (windSpeed >= 7 && windSpeed <= 11) {
        return 2;
      } else if (windSpeed >= 12 && windSpeed <= 19) {
        return 3;
      } else if (windSpeed >= 20 && windSpeed <= 29) {
        return 4;
      } else if (windSpeed >= 30 && windSpeed <= 39) {
        return 5;
      } else if (windSpeed >= 40 && windSpeed <= 50) {
        return 6;
      } else if (windSpeed >= 51 && windSpeed <= 62) {
        return 7;
      } else if (windSpeed >= 63 && windSpeed <= 75) {
        return 8;
      } else if (windSpeed >= 76 && windSpeed <= 87) {
        return 9;
      } else if (windSpeed >= 88 && windSpeed <= 102) {
        return 10;
      } else if (windSpeed >= 103 && windSpeed <= 117) {
        return 11;
      } else if (windSpeed >= 117) {
        return 12;
      }
      return -1;
    }
  },
  
  getMaxWind(station) {
    if (station.readings.length > 0) {
      let maxWind = 0;
      let latestReports = stationAnalytics.getLatestReports(station);
      if (station.readings.length > 0) {
        let maxWind = station.readings[0];
      }
      for (let i = 0; i < station.readings.length; i++) {
        if (station.readings[i].windSpeed > maxWind) {
          maxWind = station.readings[i].windSpeed;
        }
      }
      return maxWind;
    }
  },
  
  getMinWind(station) {
    if (station.readings.length > 0) {
      let maxWind = stationAnalytics.getMaxWind(station);
      let minWind = maxWind;
      let latestReports = stationAnalytics.getLatestReports(station);
      if (station.readings.length > 0) {
        let minWind = station.readings[0];
      }
      for (let i = 0; i < station.readings.length; i++) {
        if (station.readings[i].windSpeed < minWind) {
          minWind = station.readings[i].windSpeed;
        }
      }
      return minWind;
    }
  },
  
  getWindSpeed(station) {
    if (station.readings.length > 0) {
      let latestReports = stationAnalytics.getLatestReports(station);
      let windSpeed = latestReports.windSpeed;
    return windSpeed;
  }
},

  
  getTemp(station) {
    if (station.readings.length > 0) {
      let temp = 0;
      let latestReports = stationAnalytics.getLatestReports(station);
      if(station.readings.length > 0){
        let temp = station.readings[0];
        for (let i = 0; i < station.readings.length; i++) {
        temp = station.readings[i].temp;
      }
    }
    return temp;
  }
},
  
  getWindChill(station) {
    if (station.readings.length > 0) {
      let windSpeed = stationAnalytics.getWindSpeed(station);
      let latestReports = stationAnalytics.getLatestReports(station);
      let tempC = stationAnalytics.getTemp(station); 
      let windChill = 13.12 + (0.6215 * tempC) - (11.37 * Math.pow(windSpeed, 0.16)) + 0.3965 * 6 * Math.pow(2, 0.16);
      let windChillr = Math.round(windChill * 10.0) / 10.0;
      console.log(tempC + windSpeed);
      return windChillr
    }
 },
  
  
  
  
  
  
};

module.exports = stationAnalytics;
