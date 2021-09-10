"use strict";

const station = require("../controllers/station");
const readings = require("../controllers/reading");
const stationAnalytics = {                 //Station-Analytics has all of our function relating to the analytics
  getLatestReports(station) {   //Latest Reports loops through the stations readings and then gets the last value entered for whichever property you need
    let latestReports = null;
    if (station.readings.length > 0) {
      latestReports = station.readings[0];
      for (let i = 1; i < station.readings.length; i++) {
        latestReports = station.readings[station.readings.length - 1];
      }
    }
    return latestReports;
  },
  
  getLat(station){         
    return station.lat; 
  },
  
  getLon(station){
    return station.lon; 
  },

  
  getDate(station){                            //This function is creating our date object and then using .toLocaleString to get accurate time information for our locale
    const date = new Date().toLocaleString();
    return date;
  },
  
  getTempF(station) {                              //This function takes in the most recent temperature and then calculates it so that we can get the Farrenheit data.
    if (station.readings.length > 0) {
      let tempF = 0;
      let latestReports = stationAnalytics.getLatestReports(station);
      tempF += latestReports.temp * 1.8 + 32;
      tempF = Math.round(tempF * 10.0) / 10.0;
      return tempF;
    }
  },

  getMaxTemp(station) {                                   //This function is getting the maximum temperature in a station, we are going through the readings list
                                                          // and checking to see if the current reading is higher then the maxTemp and if so we are making that one
                                                          // the new maxTemp, at the end we return it so that we can display it on our weather card
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

  getMinTemp(station) {                                     //This function is getting the minimum temperature in a station, we are going through the readings list
                                                           //and checking to see if the current reading is lower then the minTemp and if so we are making that one
                                                          //the new minTemp, at the end we return it so that we can display it on our weather card
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
      return minTemp;
    }
  },
 
  getBeafourt(station) {                           //The beaufort function goes through the readings list and grabs the most recent windspeed, with that data
                                                   //it is checked to see where it falls within a range of values, depending on the value of the windspeed
                                                  //we can update the beaufort variable, at the end we return the beaufort value which we can use for display.
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

  getWindDir(station) {                                            //This function is similar to the beaufort function, we are taking in the most recent wind direction
                                                                   //that data is checked against a range of values and depending on the data we update the windDir String and
                                                                   //return it so that we can display it on our Weather cards.
    if (station.readings.length > 0) {
      let windDir = 0;
      let latestReports = stationAnalytics.getLatestReports(station);
      windDir += latestReports.windDirection;
      if (windDir == 0) {
        return 0;
      } else if (windDir >= 348.75 || windDir <= 11.25) {
        return windDir + " N";
      } else if (windDir >= 11.25 && windDir <= 33.75) {
        return windDir + " NNE";
      } else if (windDir >= 33.75 && windDir <= 56.25) {
        return windDir + " NE";
      } else if (windDir >= 56.25 && windDir <= 78.75) {
        return windDir + " ENE";
      } else if (windDir >= 78.75 && windDir <= 101.25) {
        return windDir + " E";
      } else if (windDir >= 101.25 && windDir <= 123.75) {
        return windDir + " ESE";
      } else if (windDir >= 123.75 && windDir <= 146.25) {
        return windDir + " SE";
      } else if (windDir >= 146.25 && windDir <= 168.76) {
        return windDir + " SSE";
      } else if (windDir >= 168.76 && windDir <= 191.25) {
        return windDir + " S";
      } else if (windDir >= 191.25 && windDir <= 213.75) {
        return windDir + " SSW";
      } else if (windDir >= 213.75 && windDir <= 236.25) {
        return windDir + " SW";
      } else if (windDir >= 236.25 && windDir <= 258.75) {
        return windDir + " WSW";
      } else if (windDir >= 258.75 && windDir <= 281.25) {
        return windDir + " W";
      } else if (windDir >= 281.25 && windDir <= 303.75) {
        return windDir + " WNW";
      } else if (windDir >= 303.75 && windDir <= 326.25) {
        return windDir + " NW";
      } else if (windDir >= 326.25 && windDir <= 348.75) {
        return windDir + " NNW";
      }
      return windDir;
    }
  },

  getMaxP(station) {                                                   //This function is getting the maximum pressure in a station, we are going through the readings list
                                                                       //and checking to see if the current reading is higer then the maxPressure and if so we are making that one
                                                                       //the new maxPressure, at the end we return it so that we can display it on our weather card
    if (station.readings.length > 0) {
      let maxP = 0;
      let latestReports = stationAnalytics.getLatestReports(station);
      if (station.readings.length > 0) {
        let maxP = station.readings[0];
      }
      for (let i = 0; i < station.readings.length; i++) {
        if (station.readings[i].pressure > maxP) {
          maxP = station.readings[i].pressure;
        }
      }
      return maxP;
    }
  },

  getMinP(station) {                                                  //This function is getting the minimum pressure in a station, we are going through the readings list
                                                                      //and checking to see if the current reading is lower then the minPressure and if so we are making that one
                                                                      //the new minPressure, at the end we return it so that we can display it on our weather card
    if (station.readings.length > 0) {
      let maxP = stationAnalytics.getMaxP(station);
      let minP = maxP;
      let latestReports = stationAnalytics.getLatestReports(station);
      if (station.readings.length > 0) {
        let minP = station.readings[0];
      }
      for (let i = 0; i < station.readings.length; i++) {
        if (station.readings[i].pressure < minP) {
          minP = station.readings[i].pressure;
        }
      }
      return minP;
    }
  },
 
  getMaxWind(station) {                                                //This function is getting the maximum wind speed in a station, we are going through the readings list
                                                                       //and checking to see if the current reading is higher then the maxWind and if so we are making that one
                                                                       //the new maxWind, at the end we return it so that we can display it on our weather card
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

  getMinWind(station) {                                                //This function is getting the minimum wind speed in a station, we are going through the readings list
                                                                       //and checking to see if the current reading is higher then the maxWind and if so we are making that one
                                                                       //the new maxWind, at the end we return it so that we can display it on our weather card
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

  getWindSpeed(station) {                                              //This function is getting the most recent wind speed in a station, we are using the latestReport function to pull
                                                                       //the data and then we are updating the windSpeed accordingly
    if (station.readings.length > 0) {
      let windSpeed = 0;
      let latestReports = stationAnalytics.getLatestReports(station);
      windSpeed += latestReports.windSpeed;
      return windSpeed;
    }
  },

  getTemp(station) {                                                   //This function is getting the most recent temperature in a station, we are using the latestReport function to pull
                                                                       //the data and then we are updating the temp accordingly
    if (station.readings.length > 0) {
      let temp = 0;
      let latestReports = stationAnalytics.getLatestReports(station);
      temp = latestReports.temp;
      return temp;
    }
  },

  getWindChill(station) {                                          //The getWindChill function is taking in our windSpeed and temp and then running calculations on it to get the windChill value 
    if (station.readings.length > 0) {
      let wSpeed = stationAnalytics.getWindSpeed(station);
      let tempC = stationAnalytics.getTemp(station);
      let latestReports = stationAnalytics.getLatestReports(station);
      let windChill =
        13.12 +
        0.6215 * tempC -
        11.37 * Math.pow(wSpeed, 0.16) +
        0.3965 * 6 * Math.pow(2, 0.16);
      let windChillr = Math.round(windChill * 10.0) / 10.0;
      return windChillr;
    }
  },

  getWeatherIcon(station) {                                     //This function is taking in the most recent weather code from the station and then and then checking to see what the value is, if it matches any of the expected
                                                                //results then the icon on the card will update accordingly
    if (station.readings.length > 0) {
      let wCode = 0;
      let wDescription = " ";
      let wIcon = " ";
      let latestReports = stationAnalytics.getLatestReports(station);
      wCode = latestReports.code;
      if (wCode == 100) {
        wIcon += "huge sun outline icon";
        wDescription += "Clear ";
      } else if (wCode == 200) {
        wIcon += "huge cloud sun icon";
        wDescription += "Partial Clouds ";
      } else if (wCode == 300) {
        wIcon += "huge cloud icon";
        wDescription += "Cloudy ";
      } else if (wCode == 400) {
        wIcon += "huge cloud rain icon";
        wDescription += "Light Showers ";
      } else if (wCode == 500) {
        wIcon += "huge cloud showers heavy icon";
        wDescription += "Heavy Showers ";
      } else if (wCode == 600) {
        wIcon += "huge cloud showers heavy icon";
        wDescription += "Rain ";
      } else if (wCode == 700) {
        wIcon += "huge snowflake icon";
        wDescription += "Snow ";
      } else if (wCode == 800) {
        wIcon += "huge bolt icon";
        wDescription += "Thunder ";
      }
      else{
        wIcon +="huge cloud icon";
      }
      return wIcon;
    }
  },

  getWeatherInfo(station) {                                      //This function is corresponds with the weatherIcon, the difference in this one is that we are utilising
                                                                 //the most recent weather code and then updating the string for the weather type.
    if (station.readings.length > 0) {
      let wCode = 0;
      let wDescription = " ";
      let latestReports = stationAnalytics.getLatestReports(station);
      wCode = latestReports.code;
      if (wCode == 100) {
        wDescription += "Clear ";
      } else if (wCode == 200) {
        wDescription += "Partial Clouds ";
      } else if (wCode == 300) {
        wDescription += "Cloudy ";
      } else if (wCode == 400) {
        wDescription += "Light Showers ";
      } else if (wCode == 500) {
        wDescription += "Heavy Showers ";
      } else if (wCode == 600) {
        wDescription += "Rain ";
      } else if (wCode == 700) {
        wDescription += "Snow ";
      } else if (wCode == 800) {
        wDescription += "Thunder ";
      }
      else{
        wDescription +="Unsettled"
      }
      return wDescription;
    }
  },

  getTempIcon(station) {                       //Similar to the weatherIcon function, in this function we are just checking to see if the most recent temperature is higher or lower than 15 degree, depending on which one
                                               //we update the temperature icon
    if (station.readings.length > 0) {
      let temp = 0;
      let tempIcon = " ";
      let latestReports = stationAnalytics.getLatestReports(station);
      temp = latestReports.temp;
      if (temp >= 15) {
        tempIcon += "huge red temperature high icon";
      } else if (temp <= 14) {
        tempIcon += "huge blue temperature low icon";
      }
      return tempIcon;
    }
  },

  getTempTrend(station) {                                      //This function is taking in the 3 most recent reports for temperature, we check to see if there is an upward trend, downward trend or neutral trend
    if (station.readings.length >= 3) {
      let trendIcon = " ";
      let t1 = station.readings[station.readings.length - 1];           
      let t2 = station.readings[station.readings.length - 2];
      let t3 = station.readings[station.readings.length - 3];
      if (t1.temp > t2.temp && t2.temp > t3.temp) {
        trendIcon += "huge long arrow alternate up icon";
      } else if (t1.temp < t2.temp && t2.temp < t3.temp) {
        trendIcon += "huge long arrow alternate down icon";
      } else {
        trendIcon += "huge arrows alternate horizontal icon";
      }
      return trendIcon;
    }
  },
  
  getWindTrend(station) {                                 //This function is taking in the 3 most recent reports for wind speed, we check to see if there is an upward trend, downward trend or neutral trend
    if (station.readings.length >= 3) {
      let trendIcon = " ";
      let t1 = station.readings[station.readings.length - 1];           
      let t2 = station.readings[station.readings.length - 2];
      let t3 = station.readings[station.readings.length - 3];
      if (t1.windSpeed > t2.windSpeed && t2.windSpeed > t3.windSpeed) {
        trendIcon += "huge long arrow alternate up icon";
      } else if (t1.windSpeed < t2.windSpeed && t2.windSpeed < t3.windSpeed) {
        trendIcon += "huge long arrow alternate down icon";
      } else {
        trendIcon += "huge arrows alternate horizontal icon";
      }
      return trendIcon;
    }
  },
  
  getPressureTrend(station) {                                     //This function is taking in the 3 most recent reports for pressure, we check to see if there is an upward trend, downward trend or neutral trend
    if (station.readings.length >= 3) {
      let trendIcon = " ";
      let t1 = station.readings[station.readings.length - 1];           
      let t2 = station.readings[station.readings.length - 2];
      let t3 = station.readings[station.readings.length - 3];
      if (t1.pressure > t2.pressure && t2.pressure > t3.pressure) {
        trendIcon += "huge long arrow alternate up icon";
      } else if (t1.pressure < t2.pressure && t2.pressure< t3.pressure) {
        trendIcon += "huge long arrow alternate down icon";
      } else {
        trendIcon += "huge arrows alternate horizontal icon";
      }
      return trendIcon;
    }
  }
};



module.exports = stationAnalytics;