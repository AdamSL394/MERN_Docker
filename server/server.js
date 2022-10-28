require("dotenv").config();
const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const cors = require("cors")
const mongoose = require("mongoose")
const notesRouter = require("./routes/notes")
const userRouter = require("./routes/userSettings")
const config = require("./config/config.json")
 
const path = require("path") 

let enviorment = process.env.NODE_ENV || "production"

console.log("Host Enviorment", process.env.NODE_ENV)
console.log(enviorment)
main().catch(err => console.log(err));

async function main() {
    const connect = await mongoose.connect(config[enviorment].mongodb, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    console.log(`MongoDB connected: ${(connect.connection.host)}`);
    return
}

// Research 
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// research
app.use(cors());

app.use("/notes", notesRouter);
app.use("/api/users",userRouter)

if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "production") {
    const root = require('path').join(__dirname,'..','client', 'build')
    app.use(express.static(root));
    app.use("/users", notesRouter);
    app.use("/api/users",userRouter)
    app.get('*', function (req, res) {
        res.sendFile('index.html', { root })
    });
}



app.listen((process.env.PORT || 5000), () => {
    console.log(`App listening on port ${PORT}`)
}) 