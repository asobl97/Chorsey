var express = require('express');
var router = express.Router();

var housesController = require('../controllers/Houses.js');

router.get('/', function(req, res, next) { housesController.getHouses(req, res, next); });
router.get('/:houseId', function(req, res, next) { housesController.getHouseById(req, res, next); });

router.post('/', function(req, res, next) { housesController.createHouse(req, res, next); });
router.put('/:houseId', function(req, res, next) { housesController.updateHouse(req, res, next); });
router.delete('/:houseId', function(req, res, next) { housesController.deleteHouse(req, res, next); });

module.exports = router;