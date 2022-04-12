const mongoose = require("mongoose");

const connectToDB = async () => {
    const connect = await mongoose.connect("mongodb://localhost:27017/test", {
        dbName: process.env.DB_NAME,
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });
    console.log(`MongoDB connected: ${connect.connection.host}`);
};

module.exports = connectToDB;

// var axios = require('axios');
// var data = JSON.stringify({
//     "collection": "<COLLECTION_NAME>",
//     "database": "<DATABASE_NAME>",
//     "dataSource": "Cluster0",
//     "projection": {
//         "_id": 1
//     }
// });
            
// var config = {
//     method: 'post',
//     url: 'https://data.mongodb-api.com/app/data-drneg/endpoint/data/beta/action/findOne',
//     headers: {
//         'Content-Type': 'application/json',
//         'Access-Control-Request-Headers': '*',
//         'api-key': 'xSG3B7Yjrfkoz9tgl5xy6pRUU7LOCO8geIcP3i2q0ihhIjZDk3UFCxIRKpaMSCLQ'
//     },
//     data : data
// };
            
// axios(config)
//     .then(function (response) {
//         console.log(JSON.stringify(response.data));
//     })
//     .catch(function (error) {
//         console.log(error);
//     });
