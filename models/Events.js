const mongoose = require('mongoose');

const EventsSchema = new mongoose.Schema({
    name: String,
    urlImage: String,
    description: String,
    location: String,
    date: Date,
    price: Number,
    country: String,
    city: String
});

module.exports = mongoose.model('Event', EventsSchema);