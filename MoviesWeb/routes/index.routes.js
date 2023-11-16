const express = require('express')
const router = express.Router()
const movieService = require("./../services/movies.services")
<<<<<<< HEAD
=======


router.get("/", (req, res, next) => {

  movieService
    .getTrendingMovies()
    .then(({ data }) => {
      let fiveMovies = data.results.slice(0, 6)
      res.render('index', { fiveMovies })
    })
    .catch(error => next(error))
>>>>>>> b7c5ceb5d949b8e68962a8f947b3ff3f631d2896

//CONTENIDO A PORTADA
router.get('/', (req, res, next) => {
  Promise.all(
    [
      movieService.getTrendingMovies(),
      movieService.getTrendingSeries(),
      movieService.getHeaderBillboard(),
      movieService.getUpcomingMedia(),
    ]
  ).then(([movies, series, billboard, upcoming]) => {
    const fiveMovies = movies.data.results.slice(0, 6)
    const tvShows = series.data.results.slice(0, 6)
    const marquee = billboard.data.results.slice(0, 3)
    const upcomingMedia = upcoming.data.results.slice(0, 6)
    res.render('index', { fiveMovies, tvShows, marquee, upcomingMedia })
  })
    .catch((error) => next(error));
});

module.exports = router;