import crypto from 'crypto';

const generateSecret = (bytes) => {
    return crypto.randomBytes(bytes).toString('base64');
}

module.exports = {
    port: process.env.PORT || 3001,
    saltRounds: 10,
    database: process.env.MONGODB_URI || 'mongodb://localhost:27017/stockfolio',
    secret: process.env.SECRET || generateSecret(256),
    key: 'MYKEY'
}

