import express from 'express';
import rp from 'request-promise';
import jwt from 'jsonwebtoken';
import config from '../config/data';
import User from '../models/user';
import yahooFinance from 'yahoo-finance';
import passport from 'passport';
import * as parsers from './stockDataParser';

const router = express.Router();

let queryFields = ['s', 'n', 'a', 'b', 'p', 'o', 'y', 'd', 'r1', 'q', 'c1', 'p2', 'd1', 'g', 'h', 'l', 'k', 'j', 'x', 'e1']

router.get('/quote', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    yahooFinance.snapshot({
        symbol: req.query.query,
        fields: queryFields
    }).then((snapshot) => {
        let response = { success: true };
        Object.assign(response, snapshot);
        res.json(response);
    }).catch((err) => {
        let response = { success: true, err: err };
        res.json(response);
    });
})

router.get('/quote/history', passport.authenticate('jwt', { session: false }), (req, res, next) => {

    const symbol = req.query.query;
    const time = req.query.time;

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

router.get('/find', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    var options = {
        uri: 'http://d.yimg.com/aq/autoc',
        qs: {
            query: req.query.query,
            region: 'US',
            lang: 'en-US',
        },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true
    };
    rp(options)
        .then((snapshot) => {
            let response = { success: true };
            Object.assign(response, snapshot);
            res.json(response);
        })
        .catch((err) => {
            res.json({ success: false })
        });
})

export default router;