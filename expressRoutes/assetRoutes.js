// userRoutes.js

var express = require('express');
var router = express.Router();
var userService = require('./services/user.service');

// routes
router.post('/add', add);
router.put('/:_id', update);
router.get('/', getAll);
router.get('/getCurrentAssetVal', getCurrentAssetVal);
module.exports = router;


function add(req, res) {
    userService.addAsset(req.body)
        .then(function () {
            res.json('success');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function update(req, res) {
    userService.updateAsset(req.params._id, req.body)
        .then(function () {
            res.json('success');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getAll(req, res) {
    userService.getAllAsset()
        .then(function (asset) {
            res.send(asset);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
function getCurrentAssetVal(req, res) {
    userService.getCurrentAssetVal()
        .then(function (asset) {
            res.send(asset);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
