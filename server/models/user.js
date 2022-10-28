const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    _id: { type: String },
    settings: { type: Array },
    email: { type: String }
})
 
const User = mongoose.model('User', UserSchema)

module.exports = User