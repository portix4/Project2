const express = require('express');
const router = express.Router();

const axios = require('axios')

const movieService = require("./../services/movies.services")

router.get("/", (req, res, next) => {

  movieService
    .getTrendingMovie()
    .then(movies => {
      let fiveMovies = []
      for (let i = 0; i < 6; i++) {
        fiveMovies.push(movies.data.results[i])
      }
      res.render('index', { fiveMovies })
    })
    .catch(error => next(error))

});

module.exports = router;
