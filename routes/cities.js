const express = require("express");
const router = express.Router();

const authMiddleware = require('../middleware/auth');

const {
    getCities,
    getCity,
    getRecommendedCities,
    getFavouriteCities,
    addCityToFavourites,
    removeCityFromFavourites
} = require('../controllers/cities');

router.route("/cities/:id").get(getCities);
router.route("/city/:id").get(getCity);
router.route("/recommendations").get(getRecommendedCities);
router.route("/favourite")
    .get(authMiddleware, getFavouriteCities)
    .post(authMiddleware, addCityToFavourites)
    .delete(authMiddleware, removeCityFromFavourites);

module.exports = router;
