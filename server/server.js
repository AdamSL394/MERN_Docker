require("dotenv").config();
const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const mongoose = require("mongoose")
const connectToDB = require("./database/db");
const userRouter = require("./routes/users");
const config = require("./config/config.json")
const path = require("path")
const numeral = require('numeral')

setInterval(()=> {
    console.log("hi")
    const {rss, heapTotal} = process.memoryUsage();
    console.log('rss',numeral(rss).format('0.0 ib'),'heapTotal',numeral(heapTotal).format('0.0 ib'))
},5000)


  
if (process.env.NODE_ENV === "local") {
    console.log("Host Local", process.env.NODE_ENV )
    main().catch(err => console.log(err));
    async function main() {
        const connect = await mongoose.connect(`mongodb://${config.local.mongoose_uri}:27017/test`, {
            dbName: process.env.DB_NAME,
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: true,
        })
        console.log(`Local MongoDB connected: ${(connect.connection.host)}`);
    }
}

if (process.env.NODE_ENV === "development") {
    console.log("Host Development", process.env.NODE_ENV )
    main().catch(err => console.log(err));
    async function main() {
        const connect = await mongoose.connect(`mongoose.connect("mongodb://${config.local.mongoose_uri}:27017/test`, {
            dbName: process.env.DB_NAME,
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: true,
        })
        console.log(`Development MongoDB connected: ${(connect.connection.host)}`);
    }
}

if (process.env.NODE_ENV === "staging") {
    console.log("Host", process.env.NODE_ENV )
    main().catch(err => console.log(err));
    async function main() {
        const connect = await mongoose.connect(`mongoose.connect("mongodb+srv://adam:notescript@cluster0.fepd2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
            dbName: process.env.DB_NAME,
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: true,
        })
        console.log(`Staging MongoDB connected: ${(connect.connection.host)}`);
    }
}

if (process.env.NODE_ENV === "production") {
    console.log("Host", process.env.NODE_ENV )
    main().catch(err => console.log(err));
    async function main() {
        const connect = await mongoose.connect("mongodb+srv://adam:notescript@cluster0.fepd2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
            dbName: process.env.DB_NAME,
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: true,
        })
        console.log(`Local MongoDB connected: ${(connect.connection.host)}`);
    }
}

//Research 
const bodyParser = require('body-parser');
const { response } = require("express");
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//research
app.use(cors());


if(process.env.NODE_ENV === "development"){
    //app.use('/static',express.static(path.resolve(__dirname, '../client/build')));
    app.get('/*', function (req, res) {
        res.sendFile(path.join(__dirname, '../client/build',"index.html"));
    });
} 
  
app.use("/users", userRouter); 

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
}) 