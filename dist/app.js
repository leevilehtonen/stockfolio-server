'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _data = require('./config/data');

var _data2 = _interopRequireDefault(_data);

var _user = require('./models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Initialize app
var app = (0, _express2.default)();

// Middleware
app.use((0, _helmet2.default)());
app.use(_bodyParser2.default.json());
app.use((0, _cookieParser2.default)());

// Connect to database
_mongoose2.default.Promise = _bluebird2.default;
_mongoose2.default.connect(_data2.default.database);
_mongoose2.default.connection.on('error', console.error.bind(console, 'Connection error:'));
_mongoose2.default.connection.once('open', function () {
    console.log('Connected to mongoDB at ' + _data2.default.database);
});

// Default routes
app.get('*', function (req, res) {
    res.send('Invalid entrypoint');
});
// Listen to port
app.listen(_data2.default.port, function () {
    console.log('Server started on port ' + _data2.default.port);
});
module.exports = app;