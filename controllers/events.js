const Event = require('../models/Events')
const Recommendation = require('../models/Recommendations')
const { ObjectId } = require('mongodb');

const getEvents = async (req, res) => {
    try {
        const { country, city } = req.query;
        const dbQueryParams = country && city ? { country: country.toLowerCase(), city: city.toLowerCase() } 
                                : country ? { country: country.toLowerCase() }
                                : city ? { city: city.toLowerCase() }
                                : {};
        const events = await Event.find({...dbQueryParams})
        res.status(200).json({
            success: true,
            data: events,
        });
    } catch (error) {
        res.status(500).json({ msg: `Error occured: ${error}` });
    }
};

const getEvent = async (req, res) => {
    try {
        const { id:eventID } = req.params;
        const event = await Event.findOne({ _id: ObjectId(eventID) });
        res.status(200).json({
            success: true,
            data: event,
        });
    } catch (error) {
        res.status(500).json({ msg: `Error occured: ${error}` });
    }
};

const getRecommendedEvents = async (req, res) => {
    try {
        const { currentRecommendations } = await Recommendation.findOne({ type: "events" });
        const recommendations = await Event.find({ _id: { $in: currentRecommendations }})
        res.status(200).json({
            success: true,
            data: recommendations,
        });
    } catch (error) {
        res.status(500).json({ msg: `Error occured: ${error}` });
    }
}

module.exports = {
    getEvents,
    getEvent,
    getRecommendedEvents
}