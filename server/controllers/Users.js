var usersDao = require('../daos/UsersDao.js');
var housesDao = require('../daos/HousesDao.js');
var util = require('../utils/util.js');

module.exports = {
    getUsers: function(req, res, next) {
        if (util.isNotEmpty(req.query.houseId)) {
            housesDao.getHouseById(req.query.houseId, function(house) {
                if (house == null) {
                    res.status(204).send("Found no house with ID: " + response.houseId);
                    return;
                }

                usersDao.getUsersByHouseId(house.houseId, function (response) {
                    var responseObj = {};
                    responseObj.result = response;

                    responseObj.relatables = {};
                    responseObj.relatables[house.houseId] = house;

                    res.send(responseObj);
                });
            });
        } else {
            usersDao.getAllUsers(function (response) {
                var responseObj = {};
                responseObj.result = response;

                responseObj.relatables = {};

                var houseIds = [];
                for (var usersi=0;usersi<response.length;usersi++) {
                    houseIds[usersi] = response[usersi].houseId;
                }

                housesDao.getHousesByIds(houseIds, function(houses) {
                    if (util.isNotEmpty(houses)) {
                        for (var housesi = 0; housesi < houses.length; housesi++) {
                            responseObj.relatables[houses[housesi].houseId] = houses[housesi];
                        }
                    }

                    res.send(responseObj);
                });
            });
        }
    },

    getUserById: function(req, res, next) {
        usersDao.getUserById(req.params.userId, function(response) {
            if (response == null) {
                res.status(204).send("Found no user with ID: " + req.params.userId);
                return;
            }

            var responseObj = {};
            responseObj.result = response;

            responseObj.relatables = {};
            housesDao.getHouseById(response.houseId, function(house) {
                if (util.isNotEmpty(house)) {
                    responseObj.relatables[house.houseId] = house;
                }

                res.send(responseObj);
            });
        });
    },

    createUser: function(req, res, next) {
        var user = {};
        user.userId = req.body.userId;
        user.name = req.body.name;
        user.houseId = null;

        usersDao.insertUser(user, function (response) {
            if ((util.isEmpty(response)) || (response.affectedRows != 1)) {
                res.sendStatus(500);
            } else {
                var responseObj = {};
                responseObj.result = user;

                res.send(responseObj);
            }
        });
    },

    updateUser: function(req, res, next) {
        usersDao.getUserById(req.params.userId, function(user) {
            if (user == null) {
                res.status(204).send("Found no user with ID: " + req.params.userId);
                return;
            }

            housesDao.getHouseById(req.body.houseId, function(house) {
                if ((house == null) && (util.isNotEmpty(req.body.houseId))) {
                    res.status(204).send("Found no house with ID: " + req.body.houseId);
                    return;
                }

                user.userId = req.params.userId;
                user.name = req.body.name;
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

    assignHouse: function(req, res, next) {
        usersDao.getUserById(req.params.userId, function(user) {
            if (user == null) {
                res.status(204).send("Found no user with ID: " + req.params.userId);
                return;
            }

            housesDao.getHouseById(req.params.houseId, function(house) {
                if (house == null) {
                    res.status(204).send("Found no house with ID: " + req.params.houseId);
                    return;
                }

                user.houseId = req.params.houseId;

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

            var houseId = user.houseId;

            usersDao.deleteUser(user, function(response) {
                if ((util.isEmpty(response)) || (response.affectedRows != 1)) {
                    res.sendStatus(500);
                } else {
                    housesDao.updateHouseUserCount(houseId, function () {
                        res.sendStatus(200);
                    });
                }
            });
        });
    }
};