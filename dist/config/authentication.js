'use strict';

var _passportJwt = require('passport-jwt');

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _data = require('./data');

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (passport) {
    var opts = {};
    opts.jwtFromRequest = _passportJwt.ExtractJwt.fromAuthHeader();
    opts.secretOrKey = _data2.default.secret;
    passport.use(new _passportJwt.Strategy(opts, function (jwt_payload, done) {
        _user2.default.getUserById(jwt_payload.sub, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));
};