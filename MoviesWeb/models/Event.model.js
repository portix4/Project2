const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    movie: {
        type: String,
        required: true,
    },
    location: {
        type: {
            type: String
        },
        coordinates: {
            type: [Number]
        }
    },
    timedata: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    attendees: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

eventSchema.index({ location: '2dsphere' })

const Event = model("Event", eventSchema)

module.exports = mongoose.model('Event', eventSchema);






