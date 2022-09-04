const axios = require("axios");
const ForecastWeatherData = require('./WeatherForecast')

let myMemory = {}

function getWeatherHandlerByCity(req, res) {
    let { cityQuery } = req.query;
    
    if (myMemory[cityQuery] !== undefined)
    {
      res.send(myMemory[cityQuery])
      console.log(`I have the wether data`)
    }
    else
    {
      const URL = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&city=${cityQuery}`;
      axios
        .get(URL)
        .then((server) => {
          let weatherArr = server.data.data.map((day) => {
            return new ForecastWeatherData(day);
          });
          myMemory[cityQuery] = weatherArr;
          res.status(200).send(weatherArr);
          console.log(`I don't have the weather data`)
        })
        .catch((error) => {
          res.status(404).send(error);
        });
    }
  

  }


  module.exports = getWeatherHandlerByCity;