// userRoutes.js

var express = require('express');
var router = express.Router();
var userService = require('./services/user.service');

// routes
router.post('/add', add);
router.put('/:_id', update);
router.get('/', getAll);
router.delete('/:_id', _delete);
module.exports = router;


function add(req, res) {
    userService.addStock(req.body)
        .then(function () {
            res.json('success');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function update(req, res) {
    userService.updateStock(req.params._id, req.body)
        .then(function () {
            res.json('success');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getAll(req, res) {
    userService.getAllStock()
        .then(function (stock) {
            res.send(stock);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
function _delete(req, res) {
    userService.deleteStock(req.params._id)
        .then(function () {
            res.json('success');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}