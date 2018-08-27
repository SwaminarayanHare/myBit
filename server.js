// server.js

const express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
cors = require('cors'),
config = require('./expressRoutes/services/config.json'),
expressJwt = require('express-jwt');
userRoutes = require('./expressRoutes/userRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 4000;
const secretkey = process.env.Secret || config.secret;
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, '/dist')));

// use JWT auth to secure the api, the token can be passed in the authorization header or querystring
app.use(expressJwt({
    secret: secretkey ,
    getToken: function (req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    }
}).unless({ path: ['/users/authenticate', '/users/register','/users/forgotpassword','/resetpassword'] }));

// routes
app.use('/users', require('./expressRoutes/userRoutes'));
app.use('/plans', require('./expressRoutes/planRoutes'));
app.use('/stock', require('./expressRoutes/stockRoutes'));
app.use('/subscription', require('./expressRoutes/subscriptionRoutes'));
app.use('/asset', require('./expressRoutes/assetRoutes'));
app.use('/', require('./expressRoutes/userRoutes'));
// error handler
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('Invalid Session! Please do not Refresh Browser..Go to <a href="http://www.mytradnix.com">Mytradnix.com</a>');
    } else {
        throw err;
    }
});

/*
app.all('*', function(req, res) {
    //res.sendfile('./dist/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    res.sendfile('./src/index.html');
});*/
const server = app.listen(port, function(){
console.log('Listening on port ' + port);
});
