const express = require("express");
const router = express.Router();

const authMiddleware = require('../middleware/auth');

const {
  getCountries,
  getCountryDetails,
  getRecommendedCountries,
  getFavouriteCountries,
  addCountryToFavourites,
  removeCountryFromFavourites,
} = require("../controllers/countries");

router.route("/countries/:continent").get(getCountries);
router.route("/country/:country").get(getCountryDetails);
router.route("/recommendations").get(getRecommendedCountries)
router.route("/favourite")
  .get(authMiddleware, getFavouriteCountries)
  .post(authMiddleware, addCountryToFavourites)
  .delete(authMiddleware, removeCountryFromFavourites);

module.exports = router;
