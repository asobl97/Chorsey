var usersDao = require('../daos/UsersDao.js');
var util = require('../utils/util.js');

module.exports = {
    getUsers: function(req, res, next) {
        if (util.isNotEmpty(req.query.houseId)) {
            usersDao.getUsersByHouseId(req.query, function (response) {
                res.send(response);
            });
        } else {
            usersDao.getAllUsers(function (response) {
                res.send(response);
            });
        }
    },

    getUserById: function(req, res, next) {
        usersDao.getUserById(req.params.userId, function(response) {
            res.send(response);
        });
    },

    createUser: function(req, res, next) {
        var user = {};
        user.userId = req.body.userId;
        user.name = req.body.name;
        user.houseId = req.body.houseId;

        usersDao.insertUser(user, function(response) {
            if ((util.isEmpty(response)) || (response.affectedRows != 1)) {
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        });
    },

    updateUser: function(req, res, next) {
        usersDao.getUserById(req.params.userId, function(user) {
            if (user == null) {
                res.status(204).send("Found no user with ID: " + req.params.userId);
                return;
            }

            user.userId = req.body.userId;
            user.name = req.body.name;
            user.houseId = req.body.houseId;

            usersDao.updateUser(user, function(response) {
                if ((util.isEmpty(response)) || (response.affectedRows != 1)) {
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            });
        });
    },

    deleteUser: function(req, res, next) {
        usersDao.deleteUser(req.params.userId, function(user) {
            if (user == null) {
                throw new Error("Found no user with ID: " + req.params.userId)
            }

            usersDao.deleteUser(user, function(response) {
                res.send(response);
            });
        });
    }
};