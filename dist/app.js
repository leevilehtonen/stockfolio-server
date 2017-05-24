'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

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

var _users = require('./routes/users');

var _users2 = _interopRequireDefault(_users);

var _stocks = require('./routes/stocks');

var _stocks2 = _interopRequireDefault(_stocks);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _csurf = require('csurf');

var _csurf2 = _interopRequireDefault(_csurf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Initialize app
var app = (0, _express2.default)();

// Middleware
app.use((0, _helmet2.default)());
app.use(_bodyParser2.default.json());
app.use((0, _cookieParser2.default)(_data2.default.key));
app.use((0, _cors2.default)());
app.options('*', (0, _cors2.default)());
app.use((0, _csurf2.default)({ cookie: true }));
app.use(function (req, res, next) {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    return next();
});

// Connect to database
_mongoose2.default.Promise = _bluebird2.default;
_mongoose2.default.connect(_data2.default.database);
_mongoose2.default.connection.on('error', console.error.bind(console, 'Connection error:'));
_mongoose2.default.connection.once('open', function () {
    console.log('Connected to mongoDB at ' + _data2.default.database);
});

app.use(_passport2.default.initialize());
app.use(_passport2.default.session());
require('./config/authentication')(_passport2.default);

app.use('/api/users', _users2.default);
app.use('/api/stocks', _stocks2.default);

// Default routes
app.get('/', function (req, res, next) {
    res.send('Invalid endpoint');
});
// Listen to port
app.listen(_data2.default.port, function () {
    console.log('Server started on port ' + _data2.default.port);
});
module.exports = app;