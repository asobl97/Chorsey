var express = require('express');
var router = express.Router();

var housesController = require('../controllers/Houses.js');

router.get('/', function(req, res, next) { housesController.getAllHouses(req, res, next); });
router.get('/:houseId', function(req, res, next) { housesController.getHouseById(req, res, next); });
router.get('/:name', function(req, res, next) { housesController.getHouseByName(req, res, next); });
router.get('/:userCount', function(req, res, next) { housesController.getHouseByUserCount(req, res, next); });

module.exports = router;

//to be built, using same logic as chores-router