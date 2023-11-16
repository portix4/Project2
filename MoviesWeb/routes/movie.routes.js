const express = require('express');
const router = express.Router();
const {

    postSearch,
    getMovieDetails

} = require('./../controllers/movie.controllers')

router.post("/search", postSearch)

router.get("/detalle/:movie_id", getMovieDetails)

module.exports = router