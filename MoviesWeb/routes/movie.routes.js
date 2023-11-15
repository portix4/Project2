const express = require('express');
const router = express.Router();
const axios = require('axios')

const movieService = require("./../services/movies.services")

const Event = require('./../models/User.model')

router.post("/search", (req, res) => {

    const { title } = req.body

    movieService
        .getMovieByName(title)
        .then((movies) => res.render("movies/movie-searchlist.hbs", { movies: movies.data.results }))
        .catch(error => next(error))
    // res.render("movies/movie-searchlist.hbs")
})


router.get("/detalle/:movie_id", (req, res, next) => {

    const { movie_id } = req.params;

    movieService
        .getMovieById(movie_id)
        .then((movieDet) => res.render("movies/movie-overview.hbs", movieDet.data))
        .catch(error => next(error));
});


module.exports = router