
const express = require ('express')
const app = express()
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
// const connectToDB = require("./database/db");
const MongoClient = require ('mongodb').MongoClient

// connectToDB();


// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/test', {
//     dbName: process.env.DB_NAME,
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
// });

// mongoose.connection.on("open", function(){
//     console.log("mongo connected \n");
// });

// const schema = new mongoose.Schema({ name: 'string', size: 'string' });

// const Tank = mongoose.model('Tank', schema);
// const small = new Tank({ size: 'small' });








//Research
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//research
app.use(cors());

app.get('/',(req,res) => {
    res.json('Hello World')
})

app.get('/data',(req,res) => {
    res.json('Hello World 1')
})

app.get('/artist',(req,res)=>{
    console.log("here")
    MongoClient.connect("mongodb://mongo:27017/test",{useUnifiedTopology: true},(err,client)=>{

        if(err){
            return console.log("MongoDb server not connected", err)
        }

        console.log("MongoDb server connected...")
            // const db = client.db("User");
        db = client.db("test")
        let query = {name:"Adam"}
        let result;
        db.collection("sample").findOne(query,(err,result) => {
            if(err){
                console.log("Mongo err", err)
            }
            console.log(result)
        })
        return res.json("result")
    })


})

app.post('/',(req,res)=>{
    console.log(req.body)
    res.send("Posted User Info")
})

app.listen(PORT,() => {
    console.log(`App listening on port ${PORT}`)
}) 