const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    tokenId:{type:String}
})

const User = mongoose.model('User', UserSchema)

module.exports = User