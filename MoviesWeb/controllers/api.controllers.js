const Event = require('./../models/Event.model')

const getApi = (req, res) => {

    Event
        .find()
        .then(events => res.json(events))
        .catch(error => res.status(500).json({ message: 'Server issue:', errorDetails: error }))
}


module.exports = {
    getApi
}