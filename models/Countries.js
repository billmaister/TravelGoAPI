const mongoose = require('mongoose');

const CountrySchema = new mongoose.Schema({
    name: String,
    urlImage: String,
    description: String,
    continent: String
});

module.exports = mongoose.model('Country', CountrySchema);