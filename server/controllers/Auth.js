var authDao = require('../daos/AuthDao.js');
var userController = require('../controllers/Users.js');
var firebase = require('firebase');

module.exports = {
    signUp : function(req, res, next) {

        var user = {};
        user.email = req.email;
        user.password = req.password;

        authDao.signUp(user, function(response) {
            userController.createUser(req, res, next);
        });
    },

    logIn : function(req, res, next) {
        var user = {};
        user.email = req.email;
        user.password = req.password;

        authDao.logIn(req.params.email, req.params.password, function (response) {
            res.send(response);
        });
    },

    logOut : function(req, res, next) {
        authDao.logOut(function (response) {
            res.send(response);
        });
    },

    editAccount : function(req, res, next) {
        authDao.editAccount(req.params.email, req.params.password, function () {
            userController.updateUser(req, res, next);
        });
    },

    deleteAccount : function(req, res, next) {
        authDao.deleteAccount(req.params.email, req.params.password, function (response) {
            deleteUser(req, res, next);
        });
    },

    sendResetEmail : function(req, res, next) {
        authDao.sendResetEmail(req.params.email, function (response) {
            res.send(response);
        });
    },

    resetPassword : function(req, res, next) {
        authDao.resetPassword(req.params.resetCode, req.params.newPassword, function (response) {
            userController.updateUser(req, res, next);
        });
    }
};