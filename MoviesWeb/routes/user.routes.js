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

<<<<<<< HEAD
router.post(('/:id/eliminar'), isLoggedIn, checkUser('ADMIN'), postUserDelete)
=======
    const { id } = req.params
    const newMovies = []
    let newUser

    User
        .findById(id)
        .then(user => {
            newUser = user
            const moviesmap = user.favouritesmovies.map(movieId => movieService.getMovieById(movieId))
            return Promise.all(moviesmap)
        })
        .then(response => {
            response.map(elm => newMovies.push(elm.data))
            res.render('users/profile', {
                newUser,
                newMovies,
                isAdmin: req.session.currentUser.role === 'ADMIN',
                isUser: req.session.currentUser._id === id
            })
        })
        .catch(error => next(error))
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
        .findByIdAndUpdate(userID, { $addToSet: { favouritesmovies } })
        .then(() => res.redirect(`/movie/detalle/${favouritesmovies}`))
        .catch(error => next(error))
})
>>>>>>> bae14217c1f85e753860a099faeedf056140eb6c

router.post('/favourite/:idmovie', isLoggedIn, postFavoriteMovies)

module.exports = router