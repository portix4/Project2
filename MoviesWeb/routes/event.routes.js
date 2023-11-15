const router = require('express').Router()

const Event = require('./../models/Event.model')
const User = require('./../models/User.model')

const { isLoggedIn } = require("./../middleware/route-guard")

router.post(('/crear/:movieApiId'), isLoggedIn, (req, res, next) => {

    const { movieTitle, place, latitude, longitude, date, description } = req.body

    const { movieApiId } = req.params

    const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
    }

    const { _id: createdBy } = req.session.currentUser


    Event
        .create({ movieTitle, movieApiId, place, location, date, description, createdBy })
        .then(() => res.redirect('/evento/listado'))
        .catch(error => next(error))
})


router.get(('/crear/:id/:title'), isLoggedIn, (req, res, next) => {

    const { id, title } = req.params

    res.render('moviesevents/create', { id, title })
})


router.get(('/listado'), (req, res, next) => {

    Event
        .find()
        .then(events => res.render('moviesevents/list', { events }))
        .catch(error => next(error))
})


router.get(('/detalle/:id'), (req, res, next) => {

    const { id } = req.params

    Event
        .findById(id)
        .populate('createdBy attendees')
        .then(event => res.render('moviesevents/details', event))
        .catch(error => next(error))
})


module.exports = router