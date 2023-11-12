const { Schema, model } = require('mongoose')


const eventSchema = new Schema(
    {
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
        date: {
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
    },
    {
        timestamps: true
    }
);

eventSchema.index({ location: '2dsphere' })

const Event = model("Event", eventSchema)

module.exports = Event






