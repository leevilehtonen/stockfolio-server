'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _yahooFinance = require('yahoo-finance');

var _yahooFinance2 = _interopRequireDefault(_yahooFinance);

var _data = require('../config/data');

var _data2 = _interopRequireDefault(_data);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/register', function (req, res, next) {
    console.log(req.body);

    var newUser = new _user2.default({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    _user2.default.createUser(newUser, function (err, user) {
        if (err) {
            res.json({
                success: false,
                msg: 'Failed to register',
                err: err
            });
        } else {
            res.json({
                success: true,
                msg: 'User registered'
            });
        }
    });
});
router.post('/authenticate', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    _user2.default.getUserByUsername(username, function (err, user) {
        if (err) {
            return res.json({ success: false, msg: 'Error', err: err });
        }

        if (!user) {
            return res.json({ success: false, msg: 'User not found' });
        }
        _user2.default.comparePasswords(password, user.password, function (err, isMatch) {
            if (err) {
                return res.json({ success: false, msg: 'Error', err: err });
            }
            var payload = {
                "sub": user._id,
                "name": user.username
            };
            if (isMatch) {
                var token = _jsonwebtoken2.default.sign(payload, _data2.default.key, {
                    expiresIn: 604800
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    msg: 'Logged in'
                });
            } else {
                return res.json({ success: false, msg: 'Wrong password' });
            }
        });
    });
});

router.get('/validate', _passport2.default.authenticate('jwt', { session: false }), function (req, res, next) {
    res.json({ valid: true });
});

router.post('/stocks/add', _passport2.default.authenticate('jwt', { session: false }), function (req, res, next) {
    var user = req.user.username;
    var symbol = req.body.symbol;
    var count = req.body.count;
    _user2.default.addStock(user, { stockId: symbol, amount: count }, function (err, result) {

        if (err) {
            res.json({ success: false });
        } else {
            res.json({ success: true });
        }
    });
});

router.post('/stocks/delete', _passport2.default.authenticate('jwt', { session: false }), function (req, res, next) {
    var username = req.user.username;
    var id = req.body.id;
    _user2.default.removeStock(username, id, function (err, result) {
        if (err) {
            res.json({ success: false });
        } else {
            res.json({ success: true });
        }
    });
});

router.get('/profile', _passport2.default.authenticate('jwt', { session: false }), function (req, res, next) {
    var user = {
        username: req.user.username,
        name: req.user.name,
        email: req.user.email,
        stocks: req.user.stocks.length || 0
    };
    res.json({ success: true, user: user });
});

var queryFields = ['a', 'b', 's', 'n', 'p', 'd', 'c1', 'p2', 'g', 'h', 'x', 'e1'];

router.get('/stocks', _passport2.default.authenticate('jwt', { session: false }), function (req, res, next) {
    var stocks = req.user.stocks;

    if (!stocks || stocks.length == 0) {
        res.json({ success: true });
    }

    var stockIds = stocks.map(function (item, index) {
        return item.stockId;
    });
    var amounts = stocks.map(function (item, index) {
        return item.amount;
    });
    var objectIds = stocks.map(function (item, index) {
        return item._id;
    });

    _yahooFinance2.default.snapshot({
        symbols: stockIds,
        fields: queryFields
    }).then(function (snapshot) {
        var data = Object.keys(snapshot).map(function (item) {

            return snapshot[item];
        });
        data.map(function (item, index) {
            return item.amount = amounts[index];
        });
        data.map(function (item, index) {
            return item.id = objectIds[index];
        });
        data.map(function (item, index) {
            var val = item.bid ? item.amount * item.bid : item.amount * item.previousClose;
            return item.currentValue = val;
        });

        var response = { success: true, stocks: data };
        res.json(response);
    }).catch(function (err) {
        var response = { success: true, err: err };
        res.json(response);
    });
});

module.exports = router;