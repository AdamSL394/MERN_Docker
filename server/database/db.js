const mongoose = require("mongoose");

//Asyn function makes sure that connections is established but not neccessary, Mongoose will queue your work until connection established
const connectToDB = async () => {
    //const connect = await mongoose.connect("mongodb://mongo:27017/test", {
    const connect = await mongoose.connect("mongodb://localhost:27017/test", {
        dbName: process.env.DB_NAME,
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });
    console.log(`MongoDB connected: ${connect.connection.host}`);
    return connect
};


module.exports = connectToDB;
