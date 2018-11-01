var express = require('express');
var router = express.Router();

var choresController = require('../controllers/Chores.js');

router.get('/', function(req, res, next) { choresController.getChores(req, res, next); });
router.get('/:choreId', function(req, res, next) { choresController.getChoreById(req, res, next); });
router.get('/user/:userId', function(req, res, next) { choresController.getChoresByUserId(req, res, next); });
router.get('/house/:houseId', function(req, res, next) { choresController.getChoresByHouseId(req, res, next); });
router.get('/house/:houseId/completed', function(req, res, next) { choresController.getCompletedChoresByHouseId(req, res, next); });
router.get('/house/:houseId/uncompleted', function(req, res, next) { choresController.getUncompletedChoresByHouseId(req, res, next); });

router.post('/', function(req, res, next) { choresController.createChore(req, res, next); });
router.put('/:choreId', function(req, res, next) { choresController.updateChore(req, res, next); });
router.delete('/:choreId', function(req, res, next) { choresController.deleteChore(req, res, next); });

module.exports = router;