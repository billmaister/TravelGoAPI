const mongoose = require('mongoose');

const ContinentSchema = new mongoose.Schema({
    name: String,
    urlImage: String
});

module.exports = mongoose.model('Continent', ContinentSchema);