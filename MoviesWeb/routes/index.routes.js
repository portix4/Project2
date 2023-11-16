const express = require('express');
const router = express.Router()
<<<<<<< HEAD
const { apiPromiseHome } = require('../controllers/index.controllers');

router.get('/', apiPromiseHome)
=======
const movieService = require("./../services/movies.services")
//CONTENIDO A PORTADA
router.get('/', (req, res, next) => {
  Promise.all(
    [
      movieService.getTrendingMovies(),
      movieService.getTopRatedMovies(),
      movieService.getHeaderBillboard(),
      movieService.getUpcomingMedia(),
    ]
  ).then(([movies, series, billboard, upcoming]) => {
    const fiveMovies = movies.data.results.slice(0, 6)
    const topRated = series.data.results.slice(0, 6)
    const marquee = billboard.data.results.slice(0, 3)
    const upcomingMedia = upcoming.data.results.slice(0, 6)
    res.render('index', { fiveMovies, topRated, marquee, upcomingMedia })
  })
    .catch((error) => next(error));
});
>>>>>>> bae14217c1f85e753860a099faeedf056140eb6c

module.exports = router