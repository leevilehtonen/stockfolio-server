const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const config = require('./config/data');

// Init app
const app = express();

// Middleware
app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.json('Invalid entrypoint');
})

// Listen to port
app.listen(config.port, () => {
    console.log('Server started on port ' + config.port);
});