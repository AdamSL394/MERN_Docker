require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const notesRouter = require('./routes/notes');
const userRouter = require('./routes/userSettings');
const config = require('./config/config.json');


const environment = process.env.NODE_ENV || 'production';

console.log('Host environment', process.env.NODE_ENV);

main().catch((err) => console.log(err));

async function main() {
    const connect = await mongoose.connect(config[environment].mongodb, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });
    console.log(`MongoDB connected: ${(connect.connection.host)}`);
    return;
}


const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use('/notes', notesRouter);
app.use('/api/users', userRouter);

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
    const root = require('path').join(__dirname, '..', 'client', 'build');
    app.use(express.static(root));
    app.use('/users', notesRouter);
    app.use('/api/users', userRouter);
    app.get('*', function(req, res) {
        res.sendFile('index.html', { root });
    });
}

app.listen((process.env.PORT || 5000), () => {
    console.log(`App listening on port ${process.env.port || 5000}`);
});
