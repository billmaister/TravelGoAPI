const mongoose = require('mongoose');

const PopularPlacesSchema = new mongoose.Schema({
    name: String,
    urlImage: String,
    description: String,
    shortDesc: String,
    location: String,
    countryID: String,
    cityID: String
});

module.exports = mongoose.model('PopularPlace', PopularPlacesSchema);