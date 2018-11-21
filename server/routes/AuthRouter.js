var express = require('express');
var router = express.Router();

var authController = require('../controllers/Auth.js');

module.exports = router;

router.post('/', function(req, res, next) { authController.signUp(req, res, next); });
router.put('/:userId', function(req, res, next) { authController.logIn(req, res, next); });
router.delete('/:userId', function(req, res, next) { authController.logOut(req, res, next); });

router.delete('/:userId', function(req, res, next) { authController.editAccount(req, res, next); });
router.delete('/:userId', function(req, res, next) { authController.deleteAccount(req, res, next); });
uter.delete('/:userId', function(req, res, next) { authController.sendResetEmail(req, res, next); });
router.delete('/:userId', function(req, res, next) { authController.resetPassword(req, res, next); });