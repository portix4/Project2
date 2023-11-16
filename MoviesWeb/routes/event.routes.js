const router = require('express').Router()

const Event = require('./../models/Event.model')
const User = require('./../models/User.model')

const { isLoggedIn } = require("./../middleware/route-guard")

router.post(('/crear/:movieApiId/:moviePoster'), isLoggedIn, (req, res, next) => {

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
})


router.get(('/crear/:id/:title/:poster'), isLoggedIn, (req, res, next) => {

    const { id, title, poster } = req.params

    res.render('moviesevents/create', { id, title, poster })
})


router.get(('/listado'), isLoggedIn, (req, res, next) => {

    Event
        .find()
        .then(events => res.render('moviesevents/list', { events }))
        .catch(error => next(error))
})


router.get(('/detalle/:id'), isLoggedIn, (req, res, next) => {

    const { id } = req.params
    const { _id: userID } = req.session.currentUser

    Event
        .findById(id)
        .populate('createdBy attendees')
        .then(event => res.render('moviesevents/details', { event, userID }))
        .catch(error => next(error))
})

router.post(('/irEvento/:idEvent'), isLoggedIn, (req, res, next) => {

    const { _id: userId } = req.session.currentUser
    const { idEvent } = req.params

    Event
        .findByIdAndUpdate(idEvent, { $addToSet: { attendees: userId } })
        .then(() => res.redirect(`/evento/detalle/${idEvent}`))
        .catch(error => next(error))
})


module.exports = router