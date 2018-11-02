var express = require('express');
var router = express.Router();

var usersController = require('../controllers/Users.js');

router.get('/', function(req, res, next) { usersController.getAllUsers(req, res, next); });
router.get('/:userId', function(req, res, next) { usersController.getUserById(req, res, next); });
router.get('/:name', function(req, res, next) { usersController.getUserByName(req, res, next); });
router.get('/house/:houseId', function(req, res, next) { usersController.getUserByHouseId(req, res, next); });

module.exports = router;

//to be built, using same logic as chores-router