const express = require('express')
const router = express.Router()

const Event = require('./../models/Event.model')

router.get("/map", (req, res, next) => {
    Event
        .find()
        .then(places => res.json(places))
        .catch(error => res.status(500).json({ message: 'Server issue:', errorDetails: error }))
})

module.exports = router