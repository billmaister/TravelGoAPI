const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const RecommendationSchema = new mongoose.Schema({
    type: {
        type: String,
        unique: true,
    },
    currentRecommendations: [{ type: ObjectId}]
});

module.exports = mongoose.model('Recommendation', RecommendationSchema);