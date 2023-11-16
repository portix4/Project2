const movieService = require("./../services/movies.services")

const postSearch = (req, res) => {

    const { title } = req.body

    movieService
        .getMovieByName(title)
        .then((movies) => res.render("movies/movie-searchlist.hbs", { movies: movies.data.results }))
        .catch(error => next(error))
}

const getMovieDetails = (req, res, next) => {

    const { movie_id } = req.params;

    movieService
        .getMovieById(movie_id)
        .then((movieDet) => res.render("movies/movie-overview.hbs", movieDet.data))
        .catch(error => next(error));
}

module.exports = {
    postSearch,
    getMovieDetails
}