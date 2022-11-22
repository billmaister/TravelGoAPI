const Country = require('../models/Countries')
const User = require('../models/Users');
const Recommendation = require('../models/Recommendations')
const { ObjectId } = require('mongodb');

const getCountries = async (req, res) => {
  try {
    const { continent } = req.params;
    const countries = await Country.find({ continent: continent.toLowerCase() });
    if(!countries){
      return res.status(404).json({
        msg: `Did not find any countries. Please check continent value and try again: ${ continent }`
      })
    }
    res.status(200).json({
      success: true,
      data: countries,
    });
  } catch (error) {
    res.status(500).json({ msg: `Error occured: ${error}` });
  }
};

const getCountryDetails = async (req, res) => {
  try {
    const {country} = req.params;
    const countryInfo = await Country.findOne({name: country.toLowerCase()})
    if(!countryInfo) {
      return res.status(404).json({
        msg:`Can't find any country with name: ${country}`
      })
    }
    res.status(200).json({
        success: true,
        data: countryInfo,
      })
  } catch (error) {
    res.status(500).json({ msg: `Error occured: ${error}` });
  }
};

const getRecommendedCountries = async (req, res) => {
  try {
    const { currentRecommendations } = await Recommendation.findOne({ type: "countries" });
    const recommendations = await Country.find({ _id: { $in: currentRecommendations }})
    res.status(200).json({
        success: true,
        data: recommendations,
    });
    } catch (error) {
      res.status(500).json({ msg: `Error occured: ${error}` });
    }
};

const getFavouriteCountries = async (req, res) => {
  try {
    const { user: { userID } } = req;
    const { favouriteCountries } = await User.findOne({ _id : ObjectId(userID)}, { favouriteCountries: 1});
    const completeCountryInformation = await Country.find({ _id: { $in: favouriteCountries }})
    res.status(200).json({
        success: "success",
    data: completeCountryInformation,
    });
    } catch (error) {
      res.status(500).json({ msg: `Error occured: ${error}` });
    }
};

const addCountryToFavourites = async (req, res) => {
  try {
    const {
      user: { userID },
      body: { id:countryID}
    } = req;
    await User.findByIdAndUpdate(
      { _id:userID},
      { $push: { favouriteCountries : countryID }}
    )
    res.status(201).json({
        success: true,
    });
    } catch (error) {
        res.status(500).json({ msg: `Error occured: ${error}` });
    }
};

const removeCountryFromFavourites = async (req, res) => {
  try {
    const {
        user: { userID },
        body: { id:countryID}
    } = req;
    await User.findByIdAndUpdate(
        { _id:userID},
        { $pull: { favouriteCountries : countryID }}
    )
    res.status(201).json({
        success: true,
    });
    } catch (error) {
      res.status(500).json({ msg: `Error occured: ${error}` });
    }
};

module.exports = {
  getCountries,
  getCountryDetails,
  getRecommendedCountries,
  getFavouriteCountries,
  addCountryToFavourites,
  removeCountryFromFavourites,
};
