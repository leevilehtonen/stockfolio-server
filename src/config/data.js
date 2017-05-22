import crypto from 'crypto';

const generateSecret = (bytes) => {
    const sec = crypto.randomBytes(bytes).toString('base64');
    return sec;
}

module.exports = {
    port: process.env.PORT || 3001,
    saltRounds: 10,
    database: process.env.MONGODB_URI || 'mongodb://localhost:27017/stockfolio',
    secret: process.env.SECRET || generateSecret(256),
    key: process.env.KEY || generateSecret(256),
}

