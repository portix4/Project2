const User = require('./../models/User.model')
const movieService = require('./../services/movies.services')

const getUserList = (req, res, next) => {

    User
        .find({ role: 'USER' })
        .then(users => {
            res.render('users/list', { users })
        })
        .catch(error => next(error))
}

const getUserFavoriteMovies = (req, res, next) => {

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
}

const getUserEdit = (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .then(user => res.render(('users/edit'), user))
        .catch(error => next(error))
}

const postUserEdit = (req, res, next) => {

    const { username, email, description } = req.body
    const { id } = req.params

    User
        .findByIdAndUpdate(id, { username, email, description })
        .then(() => res.redirect('/user'))
        .catch(error => next(error))
}

const postUserDelete = (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => res.redirect('/user'))
        .catch(error => next(error))
}

const postFavoriteMovies = (req, res, next) => {

    const { _id: userID } = req.session.currentUser
    const { idmovie: favouritesmovies } = req.params

    User
        .findByIdAndUpdate(userID, { $push: { favouritesmovies } })
        .then(() => res.redirect(`/movie/detalle/${favouritesmovies}`))
        .catch(error => next(error))
}

module.exports = {
    getUserList,
    getUserFavoriteMovies,
    getUserEdit,
    postUserEdit,
    postUserDelete,
    postFavoriteMovies,

}