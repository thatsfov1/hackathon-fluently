const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String
})

const UserModel = mongoose.model('users', UserSchema)

module.exports = UserModel;