const express = require ('express')
const app = express()
const port = 3001
const cors = require("cors");
const MongoClient = require ('mongodb').MongoClient


//Research
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//research
app.use(cors());

app.get('/',(req,res) => {
    res.send('Hello World')
})

app.get('/artist',(req,res)=>{
    console.log("here")
    MongoClient.connect('mongodb://new_music_default:27017',{useUnifiedTopology: true},(err,client)=>{

        if(err){
            return console.log("MongoDb server not connected", err)
        }

        console.log("MongoDb server connected...")
            // const db = client.db("User");
        db = client.db("test")
        let query = {name:"Adam"}
        db.collection("sample").findOne(query,(err,result) => {
            if(err){
                console.log("Mongo err", err)
            }
            console.log(result)
        })
    })


})

app.post('/',(req,res)=>{
    console.log(req.body)
    res.send("Posted User Info")
})

app.listen(port,() => {
    console.log(`App listening on port ${port}`)
})