const express = require('express')
const router = express.Router()

const User = require('./../models/User.model')
const movieService = require('./../services/movies.services')

const { isLoggedIn, isLoggedOut, checkUser } = require('./../middleware/route-guard')

router.get(('/'), isLoggedIn, (req, res, next) => {

    User
        .find()
        .then(users => {
            res.render('users/list', { users })
        })
        .catch(error => next(error))
})


router.get(('/:id'), isLoggedIn, (req, res, next) => {

    // TODO: RESOLVER CORRECTAMENTE
    const { id } = req.params
    const newMovies = []
    let user

    User
        .findById(id)
        .then(user => {
            user = user
            const moviesmap = user.favouritesmovies.map(e => {
                return movieService
                    .getMovieById(e)
                    .then(movies => newMovies.push(movies.data))
                    .catch(error => next(error))
            })
            return Promise.all(moviesmap)
                .then(() => {
                    res.render('users/profile', {
                        user,
                        newMovies,
                        isAdmin: req.session.currentUser.role === 'ADMIN',
                        isUser: req.session.currentUser._id === id
                    })
                })

        })
        .catch(error => next(error))

    // User
    //     .findById(id)
    //     .then(user => {
    //         const moviesmap = user.favouritesmovies.map(movieId => movieService.getMovieById(movieId))
    //         return Promise.all(moviesmap)
    //     })
    //     .then(response => {
    //         res.render('users/profile', {
    //             user,
    //             response,
    //             isAdmin: req.session.currentUser.role === 'ADMIN',
    //             isUser: req.session.currentUser._id === id
    //         })
    //     })
    //     .catch(error => next(error))
})


router.get(('/:id/editar'), isLoggedIn, checkUser('ADMIN'), (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .then(user => res.render(('users/edit'), user))
        .catch(error => next(error))
})


router.post(('/:id/editar'), isLoggedIn, checkUser('ADMIN'), (req, res, next) => {

    const { username, email, description } = req.body
    const { id } = req.params

    User
        .findByIdAndUpdate(id, { username, email, description })
        .then(() => res.redirect('/user'))
        .catch(error => next(error))
})


router.post(('/:id/eliminar'), isLoggedIn, checkUser('ADMIN'), (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => res.redirect('/user'))
        .catch(error => next(error))
})


router.post('/favourite/:idmovie', isLoggedIn, (req, res, next) => {

    const { _id: userID } = req.session.currentUser
    const { idmovie: favouritesmovies } = req.params

    User
        .findByIdAndUpdate(userID, { $push: { favouritesmovies } })
        .then(() => res.redirect(`/movie/detalle/${idmovie}`))
        .catch(error => next(error))
})


module.exports = router