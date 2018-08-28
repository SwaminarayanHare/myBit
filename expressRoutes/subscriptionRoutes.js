// userRoutes.js

var express = require('express');
var router = express.Router();
var userService = require('./services/user.service');

// routes
router.post('/add', add);
router.put('/:_id', update);
router.delete('/:_id', _delete);
router.get('/getsub/:_id', getsub);
router.get('/', getAll);
module.exports = router;


function add(req, res) {
    userService.addSubscription(req.body)
        .then(function () {
            res.json('success');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function update(req, res) {
    userService.updateSubscription(req.params._id, req.body)
        .then(function () {
            res.json('success');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function _delete(req, res) {
    userService.deleteSubscription(req.params._id)
        .then(function () {
            res.json('success');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getAll(req, res) {
    userService.getAllSubscriptions()
        .then(function (subs) {
            res.send(subs);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
function getsub(req, res) {
    userService.getByIdSub(req.params._id)
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