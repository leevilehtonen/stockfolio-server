'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _data = require('../config/data');

var _data2 = _interopRequireDefault(_data);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _yahooFinance = require('yahoo-finance');

var _yahooFinance2 = _interopRequireDefault(_yahooFinance);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _stockDataParser = require('./stockDataParser');

var parsers = _interopRequireWildcard(_stockDataParser);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var queryFields = ['s', 'n', 'a', 'b', 'p', 'o', 'y', 'd', 'r1', 'q', 'c1', 'p2', 'd1', 'g', 'h', 'l', 'k', 'j', 'x', 'e1'];

router.get('/quote', _passport2.default.authenticate('jwt', { session: false }), function (req, res, next) {
    _yahooFinance2.default.snapshot({
        symbol: req.query.query,
        fields: queryFields
    }).then(function (snapshot) {
        var response = { success: true };
        Object.assign(response, snapshot);
        res.json(response);
    }).catch(function (err) {
        var response = { success: true, err: err };
        res.json(response);
    });
});

router.get('/quote/history', _passport2.default.authenticate('jwt', { session: false }), function (req, res, next) {

    var symbol = req.query.query;
    var time = req.query.time;

    switch (time) {
        case 'day':
            parsers.getDayHistoryData(symbol, res);
            break;
        case 'week':
            parsers.getWeekHistoryData(symbol, res);
            break;
        case 'month':
            parsers.getMonthHistoryData(symbol, res);
            break;
        case 'year':
            parsers.getYearHistoryData(symbol, res);
            break;
        case 'threeMonth':
            parsers.getThreeMonthHistoryData(symbol, res);
            break;
        case 'threeYear':
            parsers.getThreeYearHistoryData(symbol, res);
            break;
        case 'all':
            parsers.getAllHistoryData(symbol, res);
            break;
        default:
            break;

    }
});

router.get('/find', _passport2.default.authenticate('jwt', { session: false }), function (req, res, next) {
    var options = {
        uri: 'http://d.yimg.com/aq/autoc',
        qs: {
            query: req.query.query,
            region: 'US',
            lang: 'en-US'
        },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true
    };
    (0, _requestPromise2.default)(options).then(function (snapshot) {
        var response = { success: true };
        Object.assign(response, snapshot);
        res.json(response);
    }).catch(function (err) {
        res.json({ success: false });
    });
});

exports.default = router;