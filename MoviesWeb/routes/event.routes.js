const router = require('express').Router()

const Event = require('./../models/Event.model')


router.get(('/crear'), (req, res, next) => {
    res.render('moviesevents/create')
})

router.post(('/crear'), (req, res, next) => {
    const { movie, place, latitude, longitude, date, description } = req.body
    console.log(movie, place, latitude, longitude, date, description)
    const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
    }

    Event
        .create({ movie, location, date, description })
        .then(() => res.redirect('/evento/listado'))
        .catch(error => next(error))
})

router.get(('/listado'), (req, res, next) => {
    console.log("entro")
    Event
        .find()
        .then(event => res.render('moviesevents/list', { event }))
        .catch(error => next(error))
})


module.exports = router