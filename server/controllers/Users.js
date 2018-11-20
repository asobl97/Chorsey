var usersDao = require('../daos/UsersDao.js');
var housesDao = require('../daos/HousesDao.js');
var util = require('../utils/util.js');

module.exports = {
    getUsers: function(req, res, next) {
        if (util.isNotEmpty(req.query.houseId)) {
            usersDao.getUsersByHouseId(req.query.houseId, function (response) {
                var responseObj = {};
                responseObj.result = response;
                res.send(responseObj);
            });
        } else {
            usersDao.getAllUsers(function (response) {
                var responseObj = {};
                responseObj.result = response;
                res.send(responseObj);
            });
        }
    },

    getUserById: function(req, res, next) {
        usersDao.getUserById(req.params.userId, function(response) {
            var responseObj = {};
            responseObj.result = response;

            responseObj.relatables = {};
            housesDao.getHouseById(response.houseId, function(house) {
                responseObj.relatables[house.houseId] = house;
                res.send(responseObj);
            });
        });
    },

    createUser: function(req, res, next) {
        housesDao.getHouseById(req.body.houseId, function(house) {
            if (house == null) {
                res.status(204).send("Found no house with ID: " + req.params.houseId);
                return;
            }

            var user = {};
            user.userId = req.body.userId;
            user.name = req.body.name;
            user.email = req.body.email;
            user.houseId = req.body.houseId;

            usersDao.insertUser(user, function (response) {
                if ((util.isEmpty(response)) || (response.affectedRows != 1)) {
                    res.sendStatus(500);
                } else {
                    var responseObj = {};
                    responseObj.result = user;

                    responseObj.relatables = {};
                    responseObj.relatables[user.houseId] = house;

                    housesDao.updateHouseUserCount(user.houseId, function (userCount) {
                        responseObj.relatables[user.houseId].userCount = userCount;
                        res.send(responseObj);
                    });
                }
            });
        });
    },

    updateUser: function(req, res, next) {
        usersDao.getUserById(req.params.userId, function(user) {
            if (user == null) {
                res.status(204).send("Found no user with ID: " + req.params.userId);
                return;
            }

            housesDao.getHouseById(req.body.houseId, function(house) {
                if (house == null) {
                    res.status(204).send("Found no house with ID: " + req.params.houseId);
                    return;
                }

                user.userId = req.body.userId;
                user.name = req.body.name;
                user.email = req.body.email;
                user.houseId = req.body.houseId;

                usersDao.updateUser(user, function (response) {
                    if ((util.isEmpty(response)) || (response.affectedRows != 1)) {
                        res.sendStatus(500);
                    } else {
                        var responseObj = {};
                        responseObj.result = user;

                        responseObj.relatables = {};
                        responseObj.relatables[user.houseId] = house;

                        housesDao.updateHouseUserCount(user.houseId, function (userCount) {
                            responseObj.relatables[user.houseId].userCount = userCount;
                            res.send(responseObj);
                        });
                    }
                });
            });
        });
    },

    deleteUser: function(req, res, next) {
        usersDao.getUserById(req.params.userId, function(user) {
            if (user == null) {
                throw new Error("Found no user with ID: " + req.params.userId)
            }

            usersDao.deleteUser(user, function(response) {
                if ((util.isEmpty(response)) || (response.affectedRows != 1)) {
                    res.sendStatus(500);
                } else {
                    housesDao.updateHouseUserCount(user.houseId, function () {
                        res.sendStatus(200);
                    });
                }
            });
        });
    }
};