import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import uniqueValidator from 'mongoose-unique-validator';
import config from '../config/data';

const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    stocks:[
        {
            stockId:{
                type: String,
                required: true,
                unique: true,
                uniqueCaseInsensitive: true,
                uppercase: true,
                index: true
            },
            amount:{
                type: Number,
                min: 0
            }
        }
    ]
});

mongoose.plugin(uniqueValidator, {message: 'Error, expected {PATH} to be unique.'});

const User = module.exports = mongoose.model('User', userSchema);

module.exports.getUserById = (id, callback) => {
    User.findById(id, callback);
}

module.exports.getUserByUsername = (username, callback) => {
    const query = {username:username}
    User.findOne(query, callback);
}

module.exports.createUser = (newUser, callback) => {
    bcrypt.genSalt(config.saltRounds, (err, salt) => {
        if (err) console.log(err);
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) console.log(err);
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.addStock = (user, stock, callback) => {
    const query = {username: user.username};
    const update = {stocks: stock};
    User.findOneAndUpdate(query, {$addToSet: update }, callback);
}
module.exports.removeStock = (user, stock, callback) => {
    const query = { username: user.username };
    const update = { stocks: {_id: stock._id}};
    User.findOneAndUpdate(query,{ $pull: update }, callback);
}
