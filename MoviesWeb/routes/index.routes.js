const express = require('express');
const router = express.Router();
const movieService = require("./../services/movies.services")


router.get("/", (req, res, next) => {

  movieService
    .getTrendingMovies()
    .then(({ data }) => {
      let fiveMovies = data.results.slice(0, 6)
      res.render('index', { fiveMovies })
    })
    .catch(error => next(error))

});

module.exports = router