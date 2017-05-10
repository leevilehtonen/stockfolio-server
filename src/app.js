import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import mongoose from 'mongoose';
import bluebird from 'bluebird';
import config from './config/data';
import User from './models/user';

// Initialize app
let app = express();

// Middleware
app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());

// Connect to database
mongoose.Promise = bluebird;
mongoose.connect(config.database);
mongoose.connection.on('error', console.error.bind(console, 'Connection error:'));
mongoose.connection.once('open', function () {
    console.log('Connected to mongoDB at ' + config.database);
});

// Default routes
app.get('*', (req, res) => {
    res.send('Invalid entrypoint');
})
// Listen to port
app.listen(config.port, () => {
    console.log('Server started on port ' + config.port);
});
module.exports = app;