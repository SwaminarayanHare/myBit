// server.js

const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./config/DB'),
    userRoutes = require('./expressRoutes/userRoutes');

mongoose.Promise = global.Promise;
console.log(config.DB)
mongoose.connect(config.DB, function(err){
    console.log("Mongoose error: ",err);
})

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 4000;

app.use('/users', userRoutes);

const server = app.listen(port, function () {
    console.log('Listening on port ' + port);
});