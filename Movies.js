const axios = require("axios");
const ForecastMoviesData = require('./MoviesForecast')

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

  module.exports = getmoviesHandler;