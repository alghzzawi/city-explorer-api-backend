const axios = require("axios");
const ForecastMoviesData = require('./MoviesForecast')
    let myMemory = {}
function getmoviesHandler(req, res) {
    let {query} = req.query;

    
    
    if (myMemory[query] !== undefined)
    {
      res.send(myMemory[query])
      console.log(`I have the movie data`)
    }
    else
    {
      const URL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${query}`
      axios
      .get(URL)
      .then((server)=>{
        let movieDataArray = server.data.results.map(day=>{
          return new ForecastMoviesData(day)
        })
        myMemory[query] = movieDataArray;
        res.send(movieDataArray)
        console.log(`I don't have the movie data`)
      })
      .catch((error) => {
        res.status(404).send(error);
      });
    }
  
  }

  module.exports = getmoviesHandler;