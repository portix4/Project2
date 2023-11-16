const Event = require('./../models/Event.model')

const postMovieCreate = (req, res, next) => {

    const { movieTitle, place, latitude, longitude, date, description } = req.body

    const { movieApiId, moviePoster } = req.params

    const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
    }

    const { _id: createdBy } = req.session.currentUser


    Event
        .create({ movieTitle, movieApiId, moviePoster, place, location, date, description, createdBy })
        .then(() => res.redirect('/evento/listado'))
        .catch(error => next(error))
}

const getMovieCreate = (req, res, next) => {

    const { id, title, poster } = req.params

    res.render('moviesevents/create', { id, title, poster })
}

const getMovieList = (req, res, next) => {

    Event
        .find()
        .then(events => res.render('moviesevents/list', { events }))
        .catch(error => next(error))
}

const getMovieDetail = (req, res, next) => {

    const { id } = req.params
    const { _id: userID } = req.session.currentUser

    Event
        .findById(id)
        .populate('createdBy attendees')
        .then(event => res.render('moviesevents/details', { event, userID }))
        .catch(error => next(error))
}

const goToEvent = (req, res, next) => {

    const { _id: userId } = req.session.currentUser
    const { idEvent } = req.params

    Event
        .findByIdAndUpdate(idEvent, { $addToSet: { attendees: userId } })
        .then(() => res.redirect(`/evento/detalle/${idEvent}`))
        .catch(error => next(error))
}

module.exports = {
    postMovieCreate,
    getMovieCreate,
    getMovieList,
    getMovieDetail,
    goToEvent
}