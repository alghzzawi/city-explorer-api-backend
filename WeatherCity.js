const axios = require("axios");
const ForecastWeatherData = require('./WeatherForecast')


function getWeatherHandlerByCity(req, res) {
    let { cityQuery } = req.query;
    
  
    const URL = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&city=${cityQuery}`;
    axios
      .get(URL)
      .then((server) => {
        let weatherArr = server.data.data.map((day) => {
          return new ForecastWeatherData(day);
        });
        res.status(200).send(weatherArr);
      })
      .catch((error) => {
        res.status(404).send(error);
      });
  }


  module.exports = getWeatherHandlerByCity;