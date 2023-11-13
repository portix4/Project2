const express = require('express');
const router = express.Router();

const axios = require('axios')

const movieService = require("./../services/movies.services")

router.get("/", (req, res, next) => {

  movieService
    .getTrendingMovie()
    .then(movies => {
      res.send(movies.data.results)
      // res.render("index");
    })
    .catch(error => next(error))

});

module.exports = router;
