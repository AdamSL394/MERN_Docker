const User = require("../models/user")
const mongoose = require ('mongoose')


const getSingleUser = async (id,userDetails) => {
    const mongoose_id = mongoose.Types.ObjectId(id);
    let user = await User.find({ _id: mongoose_id }).exec()
    if (user.length< 1 || user == undefined) {
        user = await saveNewUser(id,userDetails)
    }
    return user
}

const saveNewUser = async (id,userDetails) => {
    const mongoose_id = mongoose.Types.ObjectId(id);
    const newUser = new User ({_id : mongoose_id, email: userDetails.email})
    let errorMessage;
    newUser.save(async(err) => {
        if (err) {
            errorMessage = err.message
            return err
        }
    })
    if (errorMessage) {
        return `${errorMessage}`
    }
    return "Success" 
}

const updateUserStats = async (id,userDetails,stats) => {
    const mongoose_id = mongoose.Types.ObjectId(id);
    const filter = {_id:mongoose_id}
    let user = await User.find(filter).exec()
    if (user.length< 1 || user == undefined) {
        user = await saveNewUser(id,userDetails)
    }
    let user_settings = user[0].settings
    console.log(user_settings)
    for (let setting of user_settings){
        console.log(setting)
        if (setting.name == stats.name){ 
            arr = user_settings.filter(function(item) {
                return item.name != stats.name
            })
            const filteredUserStats = { settings: arr}
            let userWithUpdatedStats = await User.findOneAndUpdate( filter , filteredUserStats, {new:true})
            return userWithUpdatedStats
        }
    }
    console.log("hit here")
    user_settings.push(stats)
    const updatedUser = { settings: user_settings}
    let userWithUpdatedStats = await User.findOneAndUpdate( filter , updatedUser, {new:true})
    return userWithUpdatedStats
}
module.exports = {
    getSingleUser,
    saveNewUser,
    updateUserStats
    
}