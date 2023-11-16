const router = require('express').Router()

const {
    postMovieCreate,
    getMovieCreate,
    getMovieList,
    getMovieDetail,
    goToEvent
} = require('./../controllers/event.controllers')

const { isLoggedIn } = require("./../middleware/route-guard")

router.post(('/crear/:movieApiId/:moviePoster'), isLoggedIn, postMovieCreate)

router.get(('/crear/:id/:title/:poster'), isLoggedIn, getMovieCreate)

router.get(('/listado'), isLoggedIn, getMovieList)

router.get(('/detalle/:id'), isLoggedIn, getMovieDetail)

router.post(('/irEvento/:idEvent'), isLoggedIn, goToEvent)


module.exports = router