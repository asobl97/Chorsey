var choresDao = require('../daos/ChoresDao.js');
var housesDao = require('../daos/HousesDao.js');
var usersDao = require('../daos/UsersDao.js');

var util = require('../utils/util.js');

module.exports = {
    getChores: function(req, res, next) {
        if (util.isNotEmpty(req.query)) {
            choresDao.getChoresByFilter(req.query, function (response) {
                var responseObj = {};
                responseObj.result = response;
                res.send(responseObj);
            });
        } else {
            choresDao.getAllChores(function (response) {
                var responseObj = {};
                responseObj.result = response;
                res.send(responseObj);
            });
        }
    },

    getChoreById: function(req, res, next) {
        choresDao.getChoreById(req.params.choreId, function(response) {
            if (response == null) {
                res.status(204).send("Found no chore with ID: " + req.params.choreId);
            } else {
                var responseObj = {};
                responseObj.result = response;

                responseObj.relatables = {};
                housesDao.getHouseById(response.houseId, function(house) {
                    responseObj.relatables[house.houseId] = house;

                    usersDao.getUserById(response.userId, function(user) {
                        responseObj.relatables[user.userId] = user;
                        res.send(responseObj);
                    });
                });
            }
        });
    },

    createChore: function(req, res, next) {
        housesDao.getHouseById(req.body.houseId, function(house) {
            if (house == null) {
                res.status(204).send("Found no house with ID: " + req.body.houseId);
                return;
            }

            usersDao.getUserById(req.body.userId, function(user) {
                if (user == null) {
                    res.status(204).send("Found no user with ID: " + req.body.userId);
                    return;
                }

                var chore = {};
                chore.choreId = req.body.choreId;
                chore.name = req.body.name;
                chore.description = req.body.description;
                chore.dueDate = req.body.dueDate;
                chore.userId = req.body.userId;
                chore.houseId = req.body.houseId;
                chore.completed = req.body.completed;

                choresDao.insertChore(chore, function(response) {
                    if ((util.isEmpty(response)) || (response.affectedRows != 1)) {
                        res.sendStatus(500);
                    } else {
                        var responseObj = {};
                        responseObj.result = chore;

                        responseObj.relatables = {};
                        responseObj.relatables[chore.houseId] = house;
                        responseObj.relatables[chore.userId] = user;
                        res.send(responseObj);
                    }
                });
            });
        });
    },

    updateChore: function(req, res, next) {
        choresDao.getChoreById(req.params.choreId, function(chore) {
            if (chore == null) {
                res.status(204).send("Found no chore with ID: " + req.params.choreId);
                return;
            }

            housesDao.getHouseById(req.body.houseId, function(house) {
                if (house == null) {
                    res.status(204).send("Found no house with ID: " + req.body.houseId);
                    return;
                }

                usersDao.getUserById(req.body.userId, function(user) {
                    if (user == null) {
                        res.status(204).send("Found no user with ID: " + req.body.userId);
                        return;
                    }

                    chore.choreId = req.body.choreId;
                    chore.name = req.body.name;
                    chore.description = req.body.description;
                    chore.dueDate = req.body.dueDate;
                    chore.userId = req.body.userId;
                    chore.houseId = req.body.houseId;
                    chore.completed = req.body.completed;

                    choresDao.updateChore(chore, function(response) {
                        if ((util.isEmpty(response)) || (response.affectedRows != 1)) {
                            res.sendStatus(500);
                        } else {
                            var responseObj = {};
                            responseObj.result = chore;

                            responseObj.relatables = {};
                            responseObj.relatables[chore.houseId] = house;
                            responseObj.relatables[chore.userId] = user;
                            res.send(responseObj);
                        }
                    });
                });
            });
        });
    },

    deleteChore: function(req, res, next) {
        choresDao.getChoreById(req.params.choreId, function(chore) {
            if (chore == null) {
                res.status(204).send("Found no chore with ID: " + req.params.choreId);
                return;
            }

            choresDao.deleteChore(chore, function(response) {
                if ((util.isEmpty(response)) || (response.affectedRows != 1)) {
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            });
        });
    }
};