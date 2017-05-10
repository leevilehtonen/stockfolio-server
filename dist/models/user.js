'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _mongooseUniqueValidator = require('mongoose-unique-validator');

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _data = require('../config/data');

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userSchema = _mongoose2.default.Schema({

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
    stocks: [{
        stockId: {
            type: String,
            required: true,
            unique: true,
            uniqueCaseInsensitive: true,
            uppercase: true,
            index: true
        },
        amount: {
            type: Number,
            min: 0
        }
    }]
});

_mongoose2.default.plugin(_mongooseUniqueValidator2.default, { message: 'Error, expected {PATH} to be unique.' });

var User = module.exports = _mongoose2.default.model('User', userSchema);

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
};

module.exports.getUserByUsername = function (username, callback) {
    var query = { username: username };
    User.findOne(query, callback);
};

module.exports.createUser = function (newUser, callback) {
    _bcryptjs2.default.genSalt(_data2.default.saltRounds, function (err, salt) {
        if (err) console.log(err);
        _bcryptjs2.default.hash(newUser.password, salt, function (err, hash) {
            if (err) console.log(err);
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.addStock = function (user, stock, callback) {
    var query = { username: user.username };
    var update = { stocks: stock };
    User.findOneAndUpdate(query, { $addToSet: update }, callback);
};
module.exports.removeStock = function (user, stock, callback) {
    var query = { username: user.username };
    var update = { stocks: { stockId: stock.stockId } };
    User.findOneAndUpdate(query, { $pull: update }, callback);
};