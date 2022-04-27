require("dotenv").config();
const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const mongoose = require("mongoose")
const connectToDB = require("./database/db");
const userRouter = require("./routes/users");
const config = require("./config/config.json")


if (process.env.NODE_ENV === "local") {
    main().catch(err => console.log(err));
    async function main() {
        const connect = await mongoose.connect(`mongoose.connect("mongodb://${config.local.mongoose_uri}:27017/test`, {
            // `mongodb://${process.env.DB_NAME}:27017/test`, {
            dbName: process.env.DB_NAME,
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: true,
        })
        console.log(`MongoDB connected: ${(connect.connection.host)}`);
    }
} 

if (process.env.NODE_ENV === "staging") {
    main().catch(err => console.log(err));
    async function main() {
        const connect = await mongoose.connect(`mongoose.connect("mongodb://${config.development.mongoose_uri}:27017/test`, {
            dbName: process.env.DB_NAME,
            useNewUrlParser: true, 
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: true,
        })
        console.log(`Staging MongoDB connected: ${(connect.connection.host)}`);
    }
}
 
//Research 
const bodyParser = require('body-parser');
const { response } = require("express");
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//research
app.use(cors());


app.get('/', (req, res) => {
    res.json('Hello World 1')
})

app.use("/users", userRouter);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
}) 