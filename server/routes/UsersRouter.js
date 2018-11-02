var express = require('express');
var router = express.Router();

var usersController = require('../controllers/Users.js');

router.get('/', function(req, res, next) { usersController.getAllUsers(req, res, next); });
router.get('/:userId', function(req, res, next) { usersController.getUserById(req, res, next); });

router.post('/', function(req, res, next) { usersController.createUser(req, res, next); });
router.put('/:userId', function(req, res, next) { usersController.updateUser(req, res, next); });
router.delete('/:userId', function(req, res, next) { usersController.deleteUser(req, res, next); });

module.exports = router;