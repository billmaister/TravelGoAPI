const express = require("express");
const router = express.Router();

const {
    getEvents,
    getEvent,
    getRecommendedEvents
} = require("../controllers/events");

router.route("/").get(getEvents);
router.route("/event/:id").get(getEvent);
router.route("/recommendations").get(getRecommendedEvents);

module.exports = router;
