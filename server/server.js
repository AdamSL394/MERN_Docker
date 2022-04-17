require("dotenv").config();
const express = require ('express')
const app = express()
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const mongoose = require("mongoose")
const connectToDB = require("./database/db");
const Note = require("./models/notes")
mongoose.connect("mongodb://mongo:27017/test", {
// mongoose.connect("mongodb://localhost:27017/test", {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})

// const mongoose = require("mongoose")
// const MongoClient = require ('mongodb').MongoClient
// let promise = connectToDB()
// let vall;
// promise.then(function(req,res) {
//     console.log(res)
// });
// console.log("here",promise)




//Research 
const bodyParser = require('body-parser');
const { response } = require("express");
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

app.post("/note", async (req,res)=> {

    const {text, date, star} = req.body

    let a = new Note({text: text,date: date, star:star})
   a.save(function (err) {
    console.log(err)
   })
    console.log(a)
    return
})

// app.get('/artist',(req,res)=>{
//     console.log("here")
//     MongoClient.connect("mongodb://mongo:27017/test",{useUnifiedTopology: true},(err,client)=>{

//         if(err){
//             return console.log("MongoDb server not connected", err)
//         }

//         console.log("MongoDb server connected...")
//             // const db = client.db("User");
//         db = client.db("test")
//         let query = {name:"Adam"}
//         let result;
//         db.collection("sample").findOne(query,(err,result) => {
//             if(err){
//                 console.log("Mongo err", err)
//             }
//             console.log(result)
//         })
//         return res.json("result")
//     })
// })

app.post('/',(req,res)=>{
    console.log(req.body)
    res.send("Posted User Info")
})

app.listen(PORT,() => {
    console.log(`App listening on port ${PORT}`)
}) 