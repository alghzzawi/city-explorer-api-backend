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

  module.exports = ForecastMoviesData;