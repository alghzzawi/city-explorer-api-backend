"use strict";
require("dotenv").config();
const express = require("express"); // import exporess framework
const server = express();
const cors = require("cors");
const axios = require("axios");

const getWeatherHandler = require('./WeatherLatLon')
const getWeatherHandlerByCity = require('./WeatherCity')
const getmoviesHandler = require('./Movies')

server.use(cors()); // make any app to send a require

const PORT = process.env.PORT;

// http://localhost:3050/weather_alghzawi_explorer
server.get("/weather_alghzawi_explorer", getWeatherHandler);

// http://localhost:3050/weathercity_alghzawi_explorer
server.get("/weathercity_alghzawi_explorer", getWeatherHandlerByCity);

// http://localhost:3050/movies_alghzawi_explorer
server.get("/movies_alghzawi_explorer", getmoviesHandler);











server.get("/", (req, res) => {
  res.send("hi from the home route");
});

server.get("*", (req, res) => {
  res.send("there No route in this path");
});

server.listen(PORT, () => {
  console.log(`${PORT} is run`);
});
