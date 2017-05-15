import express from 'express';
import rp from 'request-promise';
import jwt from 'jsonwebtoken';
import config from '../config/data';
import User from '../models/user';
import yahooFinance from 'yahoo-finance';

const router = express.Router();

let queryFields = ['s', 'n', 'a', 'b', 'p', 'o', 'y', 'd', 'r1', 'q', 'c1', 'p2', 'd1','g','h','l','k','j', ]

router.get('/quote', (req,res,next) => {

    yahooFinance.snapshot({
        symbol: 'SDIV',
        fields:queryFields
    }).then((snapshot) => {
        res.json(snapshot);
    }).catch((err) => {
        res.json(err);
    });

    
/*
    yahooFinance.historical({
        symbol:'GOOGL',
        period: 'm'
    }).then((snapshot)=> {
        res.json(snapshot);
    }).catch((err)=> {
        res.json(err);
    })
    **/

})



router.get('/find', (req, res, next) => {
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
    .then( (snapshot) => {
        let response = {success: true};
        Object.assign(response, snapshot);
        res.json(response);
    })
    .catch( (err) => {
        res.json({success: false})
    });
})

export default router;