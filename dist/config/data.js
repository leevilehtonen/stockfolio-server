'use strict';

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var generateSecret = function generateSecret(bytes) {
    return _crypto2.default.randomBytes(bytes).toString('base64');
};

module.exports = {
    port: process.env.PORT || 3000,
    saltRounds: 10,
    database: process.env.MONGODB_URI || 'mongodb://localhost:27017/stockfolio',
    secret: process.env.SECRET || generateSecret(256)
};