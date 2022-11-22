const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
    name: String,
    urlImage: String,
    description: String,
    countryID: String
});

module.exports = mongoose.model('City', CitySchema);