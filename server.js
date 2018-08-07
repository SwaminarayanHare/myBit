// server.js

const express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
cors = require('cors'),
mongoose = require('mongoose'),
config = require('./config/DB'),
expressJwt = require('express-jwt');
userRoutes = require('./expressRoutes/userRoutes');
/*
mongoose.Promise = global.Promise;
mongoose.connect(config.DB).then(
() => {console.log('Database is connected') },
err => { console.log('Can not connect to the database'+ err)}
);
*/
const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 4000;
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));

// use JWT auth to secure the api, the token can be passed in the authorization header or querystring
app.use(expressJwt({
    secret: config.secret,
    getToken: function (req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    }
}).unless({ path: ['/users/authenticate', '/users/register'] }));

// routes
app.use('/users', require('./expressRoutes/userRoutes'));

// error handler
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('Invalid Token');
    } else {
        throw err;
    }
});

app.get('*', function(req, res) {
    res.sendfile('./dist/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    //res.sendfile('./src/index.html');
});
const server = app.listen(port, function(){
console.log('Listening on port ' + port);
});
