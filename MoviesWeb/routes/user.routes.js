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
    const { id } = req.params
    const newMovies = []

    User
        .findById(id)
        .then(user => {
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
})

// ESTO ES UNA PRIMERA TENTATIVA, ESTA CERCA, PERO NO
// const array = []
// let newUser
// let newMovies

// User
//     .findById(id)
//     .then(user => newUser = user)
//     .catch(error => next(error))

// newUser.favouritesmovies.forEach(element => {
//     movieService
//         .getMovieById(element)
//         .then(movies => newMovies = movies)
//         .catch(error => next(error))
// })

// const promises = [newUser, newMovies]

// Promise
//     .all(promises)
//     .then(response => {
//         const newUser2 = response[0]
//         const newMovie2 = response[1]

//         res.render('users/profile', {
//             newUser2,
//             newMovie2,
//             isAdmin: req.session.currentUser.role === 'ADMIN',
//             isUser: req.session.currentUser._id === id
//         })
//             .catch(err => next(err))
//     })

// ESTO ES LA BASE, QUE FUNCIONA    
// User 
//     .findById(id)
//     .then(user => res.render('users/profile', {
//         user,
//         isAdmin: req.session.currentUser.role === 'ADMIN',
//         isUser: req.session.currentUser._id === id
//     }))
//     .catch(error => next(error))



router.get(('/:id/editar'), isLoggedIn, checkUser('ADMIN'), (req, res, next) => {
    const { id } = req.params
    User
        .findById(id)
        .then(user => res.render(('users/edit'), user))
        .catch(error => next(error))
})

router.post(('/:id/editar'), isLoggedIn, checkUser('ADMIN'), (req, res, next) => {
    const { username, email, description } = req.body

    console.log(description)

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

    const userID = req.session.currentUser._id
    const { idmovie } = req.params
    User
        .findByIdAndUpdate(userID, { $push: { favouritesmovies: idmovie } })
        .then(() => res.redirect(`/movie/detalle/${idmovie}`))
        .catch(error => next(error))
})


module.exports = router