import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import helmet from 'helmet';
import mongoose from 'mongoose';
import bluebird from 'bluebird';
import config from './config/data';
import User from './models/user';
import users from './routes/users';
import stocks from './routes/stocks'
import cors from 'cors';
// Initialize app
let app = express();

// Middleware
app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser(config.key));
app.use(cors());
app.options('*', cors());

// Connect to database
mongoose.Promise = bluebird;
mongoose.connect(config.database);
mongoose.connection.on('error', console.error.bind(console, 'Connection error:'));
mongoose.connection.once('open', function() {
    console.log('Connected to mongoDB at ' + config.database);
});

app.use(passport.initialize());
app.use(passport.session());
require('./config/authentication')(passport);

//Routing
app.use('/api/users', users);
app.use('/api/stocks', stocks);


// Default routes
app.get('/', (req, res, next) => {
    res.redirect('https://github.com/leevilehtonen/stockfolio-server');
})
// Listen to port
app.listen(config.port, () => {
    console.log('Server started on port ' + config.port);
});
module.exports = app;