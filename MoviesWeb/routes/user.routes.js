const express = require('express')
const router = express.Router()
const {
    getUserList,
    getUserFavoriteMovies,
    getUserEdit,
    postUserEdit,
    postUserDelete,
    postFavoriteMovies

} = require('./../controllers/user.controllers')

const { isLoggedIn, checkUser } = require('./../middleware/route-guard')

router.get(('/'), isLoggedIn, getUserList)

router.get(('/:id'), isLoggedIn, getUserFavoriteMovies)

router.get(('/:id/editar'), isLoggedIn, checkUser('ADMIN'), getUserEdit)

router.post(('/:id/editar'), isLoggedIn, checkUser('ADMIN'), postUserEdit)

router.post(('/:id/eliminar'), isLoggedIn, checkUser('ADMIN'), postUserDelete)

router.post('/favourite/:idmovie', isLoggedIn, postFavoriteMovies)

module.exports = router