var authDao = require('../daos/AuthDao.js');
var userController = require('../controllers/Users.js');
var util = require('../utils/util');

module.exports = {
    getCurrentUser : function(req, res, next) {
        authDao.getCurrentUser(function (response) {
            if (util.isNotEmpty(response)) {
                res.send(response);
            } else {
                res.sendStatus(204);
            }
        });
    },

    signUp : function(req, res, next) {
        var user = {};
        user.email = req.body.email;
        user.password = req.body.password;

        authDao.signUp(user, function(response) {
            if (util.isNotEmpty(response)) {
                req.body.userId = response.uid;
                userController.createUser(req, res, next);
            } else {
                res.sendStatus(500);
            }
        });
    },

    logIn : function(req, res, next) {
        authDao.logIn(req.body.email, req.body.password, function (response) {
            if (util.isNotEmpty(response)) {
                res.send(response);
            } else {
                res.sendStatus(401);
            }
        });
    },

    logOut : function(req, res, next) {
        authDao.logOut(function (response) {
            if (util.isNotEmpty(response)) {
                res.send(response);
            } else {
                res.sendStatus(500);
            }
        });
    },

    editAccount : function(req, res, next) {
        authDao.editAccount(req.body.email, req.body.password, function (response) {
            if (util.isNotEmpty(response)) {
                if (response != "Unauthorized") {
                    res.send(response);
                } else {
                    res.sendStatus(401);
                }
            } else {
                res.sendStatus(500);
            }
        });
    },

    deleteAccount : function(req, res, next) {
        authDao.deleteAccount(function (response) {
            if (util.isNotEmpty(response)) {
                if (response != "Unauthorized") {
                    userController.deleteUser(req, res, next);
                } else {
                    res.sendStatus(401);
                }
            } else {
                res.sendStatus(500);
            }
        });
    },

    sendResetEmail : function(req, res, next) {
        authDao.sendResetEmail(req.body.email, function (response) {
            if (util.isNotEmpty(response)) {
                res.send(response);
            } else {
                res.sendStatus(500);
            }
        });
    },

    resetPassword : function(req, res, next) {
        authDao.resetPassword(req.body.resetCode, req.body.newPassword, function (response) {
            if (util.isNotEmpty(response)) {
                res.send(response);
            } else {
                res.sendStatus(500);
            }
        });
    }
};