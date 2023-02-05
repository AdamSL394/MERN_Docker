/* eslint-disable max-len */
const User = require('../models/user');
const mongoose = require('mongoose');


const getSingleUser = async (id, userDetails) => {
    // eslint-disable-next-line new-cap
    const mongooseId = mongoose.Types.ObjectId(id);
    let user = await User.find({_id: mongooseId}).exec();
    if (user.length< 1 || user == undefined) {
        user = await saveNewUser(id, userDetails);
    }
    return user;
};

const saveNewUser = async (id, userDetails) => {
    // eslint-disable-next-line new-cap
    const mongooseId = mongoose.Types.ObjectId(id);
    const newUser = new User({_id: mongooseId, email: userDetails.email});
    let errorMessage;
    newUser.save(async (err) => {
        if (err) {
            errorMessage = err.message;
            return err;
        }
    });
    if (errorMessage) {
        return `${errorMessage}`;
    }
    return 'Success';
};

const updateUserStats = async (id, userDetails, stats) => {
    // eslint-disable-next-line new-cap
    const mongooseId = mongoose.Types.ObjectId(id);
    const filter = {_id: mongooseId};
    let user = await User.find(filter).exec();
    if (user.length< 1 || user == undefined) {
        user = await saveNewUser(id, userDetails);
    }
    const userSettings = user[0].settings;

    for (const setting of userSettings) {
        if (setting.name == stats.name) {
            const arr = userSettings.filter(function(item) {
                return item.name != stats.name;
            });
            const filteredUserStats = {settings: arr};
            const userWithUpdatedStats = await User.findOneAndUpdate( filter, filteredUserStats, {new: true});
            return userWithUpdatedStats;
        }
    }
    userSettings.push(stats);
    const updatedUser = {settings: userSettings};
    const userWithUpdatedStats = await User.findOneAndUpdate( filter, updatedUser, {new: true});
    return userWithUpdatedStats;
};
module.exports = {
    getSingleUser,
    saveNewUser,
    updateUserStats,

};
