const express = require('express');
const router = express.Router();
const axios = require('axios')

const movieService = require("./../services/movies.services")

const Event = require('./../models/User.model')

router.post("/search", (req, res) => {
    const { title } = req.body

    movieService
        .getMovieByName(title)
        .then(movies => res.send(movies.data.results))
        .catch(error => next(error))
    // res.render("movies/movie-searchlist.hbs")

})




module.exports = router