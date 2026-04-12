import mongoose from 'mongoose';

const guestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Guest name is required'],
        trim: true
    },
    foodPreference: {
        type: String,
        trim: true
    },
    attendingAnandKaraj: {
        type: Boolean,
        default: false
    },
    attendingReception: {
        type: Boolean,
        default: false
    },
    isChild: {
        type: Boolean,
        default: false
    },
    age: {
        type: String,
        trim: true
    }
});

const rsvpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email address is required'],
        trim: true,
        lowercase: true
    },
    guests: {
        type: [guestSchema],
        validate: [v => v.length > 0, 'At least one guest is required'],
        default: []
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'declined'],
        default: 'confirmed'
    }
}, {
    timestamps: true
});

const RSVP = mongoose.model('RSVP', rsvpSchema);

export default RSVP;
