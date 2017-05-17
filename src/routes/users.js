import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import config from '../config/data';
import User from '../models/user';

const router = express.Router();

router.post('/register', (req, res, next) => {

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
    const user = req.body.user;
    const symbol = req.body.symbol;
    const count = req.body.count;
    User.addStock(user, { stockId:symbol, amount:count}, (err, result) => {

        if (err) {
            res.json({ success: false });
        }
        else {
            res.json({ success: true });
        }
    });
});

module.exports = router;