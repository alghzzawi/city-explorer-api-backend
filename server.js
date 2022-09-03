"use strict";
require("dotenv").config();
const express = require("express"); // import exporess framework
const server = express();
const cors = require("cors");
const axios = require("axios");

server.use(cors()); // make any app to send a require

const PORT = process.env.PORT;

// http://localhost:3050/weather_alghzawi_explorer
server.get("/weather_alghzawi_explorer", getWeatherHandler);

// http://localhost:3050/weathercity_alghzawi_explorer
server.get("/weathercity_alghzawi_explorer", getWeatherHandlerByCity);

// http://localhost:3050/movies_alghzawi_explorer
server.get("/movies_alghzawi_explorer", getmoviesHandler);

function getWeatherHandler(req, res) {
  let { lat, lon } = req.query;
  const URL = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lon=${lon}&lat=${lat}`;
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

function getmoviesHandler(req, res) {
  let {query} = req.query;

  const URL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${query}`
  axios
  .get(URL)
  .then((server)=>{
    let movieDataArray = server.data.results.map(day=>{
      return new ForecastMoviesData(day)
    })
    
    res.send(movieDataArray)
  })
  .catch((error) => {
    res.status(404).send(error);
  });

}

class ForecastWeatherData {
  constructor(day) {
    this.date = day.valid_date;
    this.description = day.weather.description;
    this.low_temp = day.low_temp;
    this.max_temp = day.max_temp;
  }
}

class ForecastMoviesData{
  constructor(movie) {
    this.title = movie.title
    this.overview = movie.overview
    this.vote_average = movie.vote_average
    this.vote_count = movie.vote_count
    this.poster_path = "https://image.tmdb.org/t/p/w500/" + movie.poster_path;
    this.popularity = movie.popularity;
    this.release_date = movie.release_date;
  }
}

server.get("/", (req, res) => {
  res.send("hi from the home route");
});

server.get("*", (req, res) => {
  res.send("there No route in this path");
});

server.listen(PORT, () => {
  console.log(`${PORT} is run`);
});
