import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import yahooFinance from 'yahoo-finance';
import config from '../config/data';
import User from '../models/user';

const router = express.Router();

router.post('/register', (req, res, next) => {
    console.log(req.body);

    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    });
    User.createUser(newUser, (err, user) => {
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
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) {
            return res.json({ success: false, msg: 'Error', err: err });
        }

        if (!user) {
            return res.json({ success: false, msg: 'User not found' });
        }
        User.comparePasswords(password, user.password, (err, isMatch) => {
            if (err) {
                return res.json({ success: false, msg: 'Error', err: err });
            }
            let payload = {
                "sub": user._id,
                "name": user.username,
            }
            if (isMatch) {
                const token = jwt.sign(payload, config.key, {
                    expiresIn: 604800
                });

                res.json({
                    success: true,
                    token: `JWT ${token}`,
                    msg: 'Logged in'
                });
            } else {
                return res.json({ success: false, msg: 'Wrong password' });
            }
        });
    });
});

router.get('/validate', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({ valid: true });
});

router.post('/stocks/add', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const user = req.user.username;
    const symbol = req.body.symbol;
    const count = req.body.count;
    User.addStock(user, { stockId: symbol, amount: count }, (err, result) => {

        if (err) {
            res.json({ success: false });
        }
        else {
            res.json({ success: true });
        }
    });
});

router.post('/stocks/delete', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const username = req.user.username;
    const id = req.body.id;
    User.removeStock(username, id, (err, result) => {
        if (err) {
            res.json({ success: false });
        }
        else {
            res.json({ success: true });
        }
    });
});


router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    let user = {
        username: req.user.username,
        name: req.user.name,
        email: req.user.email,
        stocks: req.user.stocks.length || 0
    }
    res.json({ success: true, user });

});

let queryFields = ['a', 'b', 's', 'n', 'p', 'd', 'c1', 'p2', 'g', 'h', 'x', 'e1']


router.get('/stocks', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    let stocks = req.user.stocks;

    if(!stocks || stocks.length == 0) {
        res.json({success: true});
    }

    let stockIds = stocks.map((item, index) => {
        return item.stockId;
    });
    let amounts = stocks.map((item, index) => {
        return item.amount;
    });
    let objectIds = stocks.map((item, index) => {
        return item._id;
    });


    yahooFinance.snapshot({
        symbols: stockIds,
        fields: queryFields
    }).then((snapshot) => {
        let data = Object.keys(snapshot).map((item) => {

            return snapshot[item];
        });
        data.map((item, index) => {
            return item.amount = amounts[index];
        });
        data.map((item, index) => {
            return item.id = objectIds[index];
        });
        data.map((item, index) => {
            let val = (item.bid) ? (item.amount * item.bid) : (item.amount * item.previousClose)
            return item.currentValue = val;
        });

        let response = { success: true, stocks: data };
        res.json(response);
    }).catch((err) => {
        let response = { success: true, err: err };
        res.json(response);
    });


});



module.exports = router;