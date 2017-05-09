const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bluebird = require('bluebird');
const config = require('./config/data');
const User = require('./models/user');

// Initialize app
const app = express();

// Middleware
app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());

// Connect to database
mongoose.Promise = bluebird;
mongoose.connect(config.database);
mongoose.connection.on('error', console.error.bind(console, 'Connection error:'));
mongoose.connection.once('open', function() {
    console.log('Connected to mongoDB at ' + config.database);

    let testUser = new User( {
        email:'test@test.com',
        username:'tester',
        name:'test tester',
        password:'123456',
        stocks:[]
    });

    
    User.createUser(testUser, (err) => {

    });



});

// Default routes
app.get('*', (req, res) => {
    res.json('Invalid entrypoint');
})

// Listen to port
app.listen(config.port, () => {
    console.log('Server started on port ' + config.port);
});
module.exports = app;