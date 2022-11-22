const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');

const UsersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email was not provided.'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
    },
    firstname: {
        type: String,
        required: [true, 'First name was not provided.'],
        lowercase: true,
        trim: true,
        minLength: [2, "First name is too short."],
        maxLength: [50, "First name is too long."]
    },
    lastname: {
        type: String,
        required: [true, 'Last name was not provided.'],
        lowercase: true,
        trim: true,
        minLength: [2, "Last name is too short."],
        maxLength: [50, "Last name is too long."]
    },
    favouriteCountries: [{ type : ObjectId }],
    favouriteCities: [{ type : ObjectId }],
    favouritePlaces: [{ type : ObjectId }],
    favouriteEvents: [{ type : ObjectId }]
});

UsersSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UsersSchema.methods.createToken = function() {
    return jwt.sign(
        { userID:this._id, firstname:this.firstname}, 
        process.env.JWT_SECRET, 
        { expiresIn: process.env.JWT_LIFETIME }
    );
};

UsersSchema.methods.validatePassword = async function(passwordToValidate) {
    const isValid = await bcrypt.compare(passwordToValidate, this.password);
    return isValid;
};

module.exports = mongoose.model('User', UsersSchema);