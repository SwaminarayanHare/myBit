// userRoutes.js

var express = require('express');
var router = express.Router();
var userService = require('./services/user.service');
var path = require('path');

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.put('/:_id', update);
router.delete('/:_id', _delete);
router.post('/forgotpassword',forgotpassword);
router.post('/resetpassword',resetpassword);
router.get('/resetpassword',function (req,res){
    res.sendFile(path.resolve('./expressRoutes/services/templates/reset-password.html'));

});

module.exports = router;

function authenticate(req, res) {
    userService.authenticate(req.body.username, req.body.password)
        .then(function (user) {
            if (user) {
                // authentication successful
                res.send(user);
            } else {
                // authentication failed
                res.status(400).send('Username or password is incorrect');
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function register(req, res) {
    userService.create(req.body)
        .then(function () {
            res.json('success');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getAll(req, res) {
    userService.getAll()
        .then(function (users) {
            res.send(users);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getCurrent(req, res) {
    userService.getById(req.user.sub)
        .then(function (user) {
            if (user) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function update(req, res) {
    userService.update(req.params._id, req.body)
        .then(function () {
            res.json('success');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function _delete(req, res) {
    userService.delete(req.params._id)
        .then(function () {
            res.json('success');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
function forgotpassword(req, res) {
   
    userService.forgotpassword(req.body.email)
    .then(function(){
        res.json('success');
    })
    .catch(function (err){
        res.status(400).send(err);
    });
}
function resetpassword(req, res) {
    userService.resetpassword(req,res)
    .then(function(){
        res.json('success');
    })
    .catch(function (err){
        res.status(400).send(err);
    });
}