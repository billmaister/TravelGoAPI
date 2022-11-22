const City = require('../models/Cities');
const User = require('../models/Users');
const Recommendation = require('../models/Recommendations')
const { ObjectId } = require('mongodb');

const getCities = async (req, res) => {
    try {
    const {id:countryID} = req.params;
    const cities = await City.find({ countryID })
    if(!cities){
      return res.status(404).json({
        msg: `Can't find any cities with country id: ${countryID}`
      })
    }
    res.status(200).json({
        success: true,
        data: cities,
    });
  } catch (error) {
    res.status(500).json({ msg: `Error occured: ${error}` });
  }
}

const getCity = async (req, res) => {
    try {
    const {id:cityID} = req.params;
    const completeCityInfo = await City.find({countryID: cityID})
    if(!cityInfo){
      return res.status(404).json({
        msg: `Can't find any cities with id: ${cityID}`
      })
    }
    res.status(200).json({
        success: true,
        data: completeCityInfo,
    });
    } catch (error) {
        res.status(500).json({ msg: `Error occured: ${error}` });
    }
}

const getRecommendedCities = async (req, res) => {
    try {
        const { currentRecommendations } = await Recommendation.findOne({ type: "cities" });
        const recommendations = await City.find({ _id: { $in: currentRecommendations }})
        res.status(200).json({
            success: true,
            data: recommendations,
        });
    } catch (error) {
        res.status(500).json({ msg: `Error occured: ${error}` });
    }
}

const getFavouriteCities = async (req, res) => {
    try {
        const { user: { userID } } = req;
        const { favouriteCities } = await User.findOne({ _id : ObjectId(userID)}, { favouriteCities: 1});
        const cityInformation = await City.find({ _id: { $in: favouriteCities }})
        res.status(200).json({
            success: "success",
        data: cityInformation,
        });
    } catch (error) {
        res.status(500).json({ msg: `Error occured: ${error}` });
    }
}

const addCityToFavourites = async (req, res) => {
    try {
        const {
            user: { userID },
            body: { id:cityID}
        } = req;
        await User.findByIdAndUpdate(
            { _id:userID},
            { $push: { favouriteCities : cityID }}
        )
        res.status(201).json({
            success: true,
        });
    } catch (error) {
        res.status(500).json({ msg: `Error occured: ${error}` });
    }
};

const removeCityFromFavourites = async (req, res) => {
    try {
        const {
            user: { userID },
            body: { id:cityID}
        } = req;
        await User.findByIdAndUpdate(
            { _id:userID},
            { $pull: { favouriteCities : cityID }}
        )
        res.status(201).json({
            success: true,
        });
    } catch (error) {
        res.status(500).json({ msg: `Error occured: ${error}` });
    }
};

module.exports = {
    getCities,
    getCity,
    getRecommendedCities,
    getFavouriteCities,
    addCityToFavourites,
    removeCityFromFavourites
}