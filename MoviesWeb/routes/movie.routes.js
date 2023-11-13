const express = require('express');
const router = express.Router();
const Event = require('./../models/User.model')

router.get("/movie/search/:title", (req, res,) => res.render("movies/movie-searchlist.hbs"))



module.exports = router