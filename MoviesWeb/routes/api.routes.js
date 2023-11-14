const express = require('express')
const router = express.Router()

const Event = require('./../models/Event.model')

router.get("/map", (req, res, next) => {
    Event
        .find()
        .then(events => res.json(events))
        .catch(error => res.status(500).json({ message: 'Server issue:', errorDetails: error }))
})

module.exports = router

