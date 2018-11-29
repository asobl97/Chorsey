var express = require('express');
var router = express.Router();

var authController = require('../controllers/Auth.js');

router.get('/', function(req, res, next) { authController.getCurrentUser(req, res, next); });
router.post('/', function(req, res, next) { authController.signUp(req, res, next); });
router.put('/login', function(req, res, next) { authController.logIn(req, res, next); });
router.put('/logout', function(req, res, next) { authController.logOut(req, res, next); });
router.put('/sendEmail', function(req, res, next) { authController.sendResetEmail(req, res, next); });
router.put('/resetPassword', function(req, res, next) { authController.resetPassword(req, res, next); });
router.put('/:userId', function(req, res, next) { authController.editAccount(req, res, next); });
router.delete('/:userId', function(req, res, next) { authController.deleteAccount(req, res, next); });

module.exports = router;