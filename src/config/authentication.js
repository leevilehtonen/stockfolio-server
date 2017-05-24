import {Strategy, ExtractJwt} from 'passport-jwt';
import User from '../models/user';
import config from './data';

module.exports = (passport) => {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret;
    passport.use(new Strategy(opts, (jwt_payload, done) => {
        User.getUserById(jwt_payload.sub, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if(user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));
}