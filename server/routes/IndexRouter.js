var express = require('express');
var router = express.Router();

var indexController = require('../controllers/Index.js');

/* GET home page. */
router.get('/', function(req, res, next) { indexController.getHomePage(req, res, next) });

module.exports = router;
