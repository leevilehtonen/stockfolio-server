const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-unique-validator');
const config = require('../config/data');

const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    stocks:[
        {
            stockId:String,
            amount:Number
        }
    ]
});

mongoose.plugin(uniqueValidator, {message: 'Error, expected {PATH} to be unique.'});

const User = module.exports = mongoose.model('User', userSchema);

module.exports.getUserById = (id, callback) => {
    User.findById(id, callback);
}

module.exports.getUserByUsername = (username, callback) => {
    const query = {username:username}
    User.findOne(query, callback);
}

module.exports.createUser = (newUser, callback) => {
    bcrypt.genSalt(config.saltRounds, (err, salt) => {
        if (err) console.log(err);
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) console.log(err);
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}